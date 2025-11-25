import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { StudySetRepository } from "../repository/study-set-repository.interface";
import { StudySet } from "../entities/study-set.entity";
import { VocabularyService } from "@module/vocabulary/service/vocabulary.service";
import { StudySetVocabMapService } from "@module/study-set-vocab-map/service/study-set-vocab-map.service";
import { SrsProgressService } from "@module/srs-progress/service/srs-progress.service";
import { User } from "@module/user/entities/user.entity";
import { CreateStudySetWithVocabulariesDto } from "../dto/create-study-set-with-vocabularies.dto";
import { Vocabulary } from "@module/vocabulary/entities/vocabulary.entity";
import { StudySetVocabMap } from "@module/study-set-vocab-map/entities/study-set-vocab-map.entity";

@Injectable()
export class StudySetService extends BaseService<StudySet, StudySetRepository> {
    constructor(
        @InjectRepository(Entity.STUDY_SET)
        private readonly studySetRepository: StudySetRepository,
        @InjectTransaction()
        private readonly studySetTransaction: BaseTransaction,
        private readonly vocabularyService: VocabularyService,
        private readonly studySetVocabMapService: StudySetVocabMapService,
        private readonly srsProgressService: SrsProgressService,
    ) {
        super(studySetRepository, {
            notFoundCode: "error-study-set-not-found",
            transaction: studySetTransaction,
        });
    }

    async createWithVocabularies(
        user: User,
        dto: CreateStudySetWithVocabulariesDto,
    ): Promise<{ studySet: StudySet; vocabularies: Vocabulary[] }> {
        // Bắt đầu transaction
        const transaction = await this.studySetTransaction.startTransaction();

        try {
            // 1. Tạo study-set
            const studySetData: Partial<StudySet> = {
                userId: user._id,
                title: dto.title,
                description: dto.description,
                difficulty: dto.difficulty,
                isPublic: dto.isPublic,
            };

            const studySet = await this.create(user, studySetData, {
                transaction,
            });

            // 2. Tạo vocabularies
            const vocabularies: Vocabulary[] = [];
            for (const vocab of dto.vocabularies) {
                const vocabularyData: Partial<Vocabulary> = {
                    userId: user._id,
                    word: vocab.word,
                    wordLanguage: vocab.wordLanguage,
                    definition: vocab.definition,
                    definitionLanguage: vocab.definitionLanguage,
                    ipa: vocab.ipa,
                    audioUrl: vocab.audioUrl,
                    priority: vocab.priority,
                };

                const createdVocabulary = await this.vocabularyService.create(
                    user,
                    vocabularyData,
                    { transaction },
                );
                vocabularies.push(createdVocabulary);
            }

            // 3. Tạo mappings giữa study-set và vocabularies
            const mapDataList: Partial<StudySetVocabMap>[] = vocabularies.map(
                (vocab, index) => ({
                    studySetId: studySet._id,
                    vocabularyId: vocab._id,
                    sortOrder: index,
                }),
            );

            await this.studySetVocabMapService.insertMany(user, mapDataList, {
                transaction,
            });

            // Commit transaction
            await this.studySetTransaction.commitTransaction(transaction);

            return { studySet, vocabularies };
        } catch (error) {
            // Rollback transaction nếu có lỗi
            await this.studySetTransaction.abortTransaction(transaction);
            throw error;
        }
    }

    async getFullInfo(
        user: User,
        studySetId: string,
    ): Promise<{ studySet: StudySet; vocabularies: Vocabulary[] }> {
        // 1. Lấy study-set
        const studySet = await this.getById(user, studySetId);

        // 2. Lấy tất cả mappings từ study-set-vocab-map, sắp xếp theo sortOrder
        const mappings = await this.studySetVocabMapService.getMany(
            user,
            { studySetId },
            { sort: { sortOrder: 1 } },
        );

        // 3. Lấy tất cả vocabularies theo vocabularyId từ mappings
        const vocabularies: Vocabulary[] = [];

        for (const map of mappings) {
            try {
                const vocab = await this.vocabularyService.getById(
                    user,
                    map.vocabularyId,
                );
                if (vocab) {
                    vocabularies.push(vocab);
                }
            } catch (error) {
                // Bỏ qua nếu vocabulary không tồn tại
                continue;
            }
        }

        return { studySet, vocabularies };
    }

    /**
     * Tính toán status học tập của study-set
     * @param user - User đang xem
     * @param studySetId - ID của study-set
     * @param minRepetitionsForDone - Số lần lặp lại tối thiểu để coi là "done" (mặc định: 5)
     * @returns "done" | "continue" | "not_started"
     */
    async getLearningStatus(
        user: User,
        studySetId: string,
        minRepetitionsForDone: number = 5,
    ): Promise<"done" | "continue" | "not_started"> {
        // 1. Lấy tất cả vocabularies trong study-set
        const mappings = await this.studySetVocabMapService.getMany(user, {
            studySetId,
        });

        if (mappings.length === 0) {
            return "not_started";
        }

        const vocabularyIds = mappings.map((map) => map.vocabularyId);

        // 2. Lấy tất cả SRS progress của user
        const allSrsProgress = await this.srsProgressService.getMany(user, {
            userId: user._id,
        });

        // 3. Filter chỉ lấy progress của các vocabularies trong study-set
        const srsProgressList = allSrsProgress.filter((progress) =>
            vocabularyIds.includes(progress.vocabularyId),
        );

        // 4. Tạo map để dễ tìm kiếm
        const progressMap = new Map<string, number>();
        srsProgressList.forEach((progress) => {
            progressMap.set(progress.vocabularyId, progress.repetitions || 0);
        });

        // 5. Phân loại vocabularies
        let learnedCount = 0; // Số vocabulary đã học (có progress)
        let doneCount = 0; // Số vocabulary đã học xong (repetitions >= minRepetitionsForDone)

        for (const vocabularyId of vocabularyIds) {
            const repetitions = progressMap.get(vocabularyId);
            if (repetitions !== undefined) {
                learnedCount++;
                if (repetitions >= minRepetitionsForDone) {
                    doneCount++;
                }
            }
        }

        // 6. Xác định status
        if (learnedCount === 0) {
            return "not_started";
        } else if (doneCount === vocabularyIds.length) {
            return "done";
        } else {
            return "continue";
        }
    }

    /**
     * Lấy thông tin study-set kèm status học tập
     */
    async getFullInfoWithStatus(
        user: User,
        studySetId: string,
        minRepetitionsForDone: number = 5,
    ): Promise<{
        studySet: StudySet;
        vocabularies: Vocabulary[];
        status: "done" | "continue" | "not_started";
    }> {
        const fullInfo = await this.getFullInfo(user, studySetId);
        const status = await this.getLearningStatus(
            user,
            studySetId,
            minRepetitionsForDone,
        );

        return {
            ...fullInfo,
            status,
        };
    }
}

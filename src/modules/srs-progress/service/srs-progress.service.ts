import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { SrsProgress } from "../entities/srs-progress.entity";
import { SrsProgressRepository } from "../repository/srs-progress-repository.interface";
import { User } from "@module/user/entities/user.entity";
import {
    ReviewFlashcardDto,
    FlashcardAction,
} from "../dto/review-flashcard.dto";

@Injectable()
export class SrsProgressService extends BaseService<
    SrsProgress,
    SrsProgressRepository
> {
    constructor(
        @InjectRepository(Entity.SRS_PROGRESS)
        private readonly srsProgressRepository: SrsProgressRepository,
        @InjectTransaction()
        private readonly srsProgressTransaction: BaseTransaction,
    ) {
        super(srsProgressRepository, {
            notFoundCode: "error-srs-progress-not-found",
            transaction: srsProgressTransaction,
        });
    }

    /**
     * Cập nhật SRS progress khi người dùng review flashcard
     * Sử dụng thuật toán SM-2 (SuperMemo 2)
     */
    async reviewFlashcard(
        user: User,
        dto: ReviewFlashcardDto,
    ): Promise<SrsProgress> {
        const now = new Date();

        // Tìm hoặc tạo SRS progress
        let progress = await this.srsProgressRepository.getOne({
            userId: user._id,
            vocabularyId: dto.vocabularyId,
        });

        // Nếu chưa có progress, tạo mới với giá trị mặc định
        if (!progress) {
            progress = await this.create(user, {
                userId: user._id,
                vocabularyId: dto.vocabularyId,
                interval: 1,
                easiness: 2.5,
                repetitions: 0,
                nextReviewAt: now,
            });
        }

        // Tính toán quality dựa trên action
        // Quality: 0-5 (0 = hoàn toàn quên, 5 = nhớ hoàn hảo)
        const quality = dto.action === FlashcardAction.KNOW ? 5 : 0;

        // Cập nhật easiness factor (EF)
        let newEasiness =
            progress.easiness +
            (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

        // Đảm bảo easiness không nhỏ hơn 1.3
        if (newEasiness < 1.3) {
            newEasiness = 1.3;
        }

        let newRepetitions: number;
        let newInterval: number;

        if (dto.action === FlashcardAction.KNOW) {
            // Đã nhớ: tăng repetitions và interval
            if (progress.repetitions === 0) {
                newInterval = 1;
            } else if (progress.repetitions === 1) {
                newInterval = 6;
            } else {
                newInterval = Math.round(progress.interval * newEasiness);
            }
            newRepetitions = progress.repetitions + 1;
        } else {
            // Chưa nhớ: reset về đầu
            newRepetitions = 0;
            newInterval = 1;
        }

        // Tính next review date
        const nextReviewAt = new Date(now);
        nextReviewAt.setDate(nextReviewAt.getDate() + newInterval);

        // Cập nhật progress
        const updatedProgress = await this.updateById(user, progress._id, {
            interval: newInterval,
            easiness: newEasiness,
            repetitions: newRepetitions,
            nextReviewAt,
            lastReviewAt: now,
        });

        return updatedProgress;
    }
}

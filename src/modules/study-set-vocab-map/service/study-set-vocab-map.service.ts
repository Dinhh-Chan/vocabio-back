import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { StudySetVocabMapRepository } from "../repository/study-set-vocab-map-repository.interface";
import { StudySetVocabMap } from "../entities/study-set-vocab-map.entity";

@Injectable()
export class StudySetVocabMapService extends BaseService<
    StudySetVocabMap,
    StudySetVocabMapRepository
> {
    constructor(
        @InjectRepository(Entity.STUDY_SET_VOCAB_MAP)
        private readonly studySetVocabMapRepository: StudySetVocabMapRepository,
        @InjectTransaction()
        private readonly studySetVocabMapTransaction: BaseTransaction,
    ) {
        super(studySetVocabMapRepository, {
            notFoundCode: "error-study-set-vocab-map-not-found",
            transaction: studySetVocabMapTransaction,
        });
    }
}

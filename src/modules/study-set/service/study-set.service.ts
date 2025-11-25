import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { StudySetRepository } from "../repository/study-set-repository.interface";
import { StudySet } from "../entities/study-set.entity";

@Injectable()
export class StudySetService extends BaseService<StudySet, StudySetRepository> {
    constructor(
        @InjectRepository(Entity.STUDY_SET)
        private readonly studySetRepository: StudySetRepository,
        @InjectTransaction()
        private readonly studySetTransaction: BaseTransaction,
    ) {
        super(studySetRepository, {
            notFoundCode: "error-study-set-not-found",
            transaction: studySetTransaction,
        });
    }
}

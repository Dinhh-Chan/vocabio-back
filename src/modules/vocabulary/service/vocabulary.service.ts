import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { VocabularyRepository } from "../repository/vocabulary-repository.interface";
import { Vocabulary } from "../entities/vocabulary.entity";
import { User } from "@module/user/entities/user.entity";

@Injectable()
export class VocabularyService extends BaseService<
    Vocabulary,
    VocabularyRepository
> {
    constructor(
        @InjectRepository(Entity.VOCABULARY)
        private readonly vocabularyRepository: VocabularyRepository,
        @InjectTransaction()
        private readonly vocabularyTransaction: BaseTransaction,
    ) {
        super(vocabularyRepository, {
            notFoundCode: "error-vocabulary-not-found",
            transaction: vocabularyTransaction,
        });
    }
}

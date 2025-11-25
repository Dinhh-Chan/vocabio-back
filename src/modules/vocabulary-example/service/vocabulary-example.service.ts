import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { VocabularyExampleRepository } from "../repository/vocabulary-example-repository.interface";
import { VocabularyExample } from "../entities/vocabulary-example.entity";

@Injectable()
export class VocabularyExampleService extends BaseService<
    VocabularyExample,
    VocabularyExampleRepository
> {
    constructor(
        @InjectRepository(Entity.VOCABULARY_EXAMPLE)
        private readonly vocabularyExampleRepository: VocabularyExampleRepository,
        @InjectTransaction()
        private readonly vocabularyExampleTransaction: BaseTransaction,
    ) {
        super(vocabularyExampleRepository, {
            notFoundCode: "error-vocabulary-example-not-found",
            transaction: vocabularyExampleTransaction,
        });
    }
}

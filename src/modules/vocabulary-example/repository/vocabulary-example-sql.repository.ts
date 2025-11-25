import { VocabularyExampleModel } from "@module/repository/sequelize/model/vocabulary-example.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { VocabularyExample } from "../entities/vocabulary-example.entity";
import { VocabularyExampleRepository } from "./vocabulary-example-repository.interface";

export class VocabularyExampleSqlRepository
    extends SqlRepository<VocabularyExample>
    implements VocabularyExampleRepository
{
    constructor(
        @InjectModel(VocabularyExampleModel)
        private readonly vocabularyExampleModel: ModelCtor<VocabularyExampleModel>,
    ) {
        super(vocabularyExampleModel, {
            dataPartition: { mapping: "dataPartitionCode" },
        });
    }
}

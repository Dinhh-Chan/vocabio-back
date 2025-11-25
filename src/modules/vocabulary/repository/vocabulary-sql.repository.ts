import { VocabularyModel } from "@module/repository/sequelize/model/vocabulary.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { Vocabulary } from "../entities/vocabulary.entity";
import { VocabularyRepository } from "./vocabulary-repository.interface";

export class VocabularySqlRepository
    extends SqlRepository<Vocabulary>
    implements VocabularyRepository
{
    constructor(
        @InjectModel(VocabularyModel)
        private readonly vocabularyModel: ModelCtor<VocabularyModel>,
    ) {
        super(vocabularyModel, {
            dataPartition: { mapping: "dataPartitionCode" },
        });
    }
}

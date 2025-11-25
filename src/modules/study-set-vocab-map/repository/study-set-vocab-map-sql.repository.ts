import { StudySetVocabMapModel } from "@module/repository/sequelize/model/study-set-vocab-map.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { StudySetVocabMap } from "../entities/study-set-vocab-map.entity";
import { StudySetVocabMapRepository } from "./study-set-vocab-map-repository.interface";

export class StudySetVocabMapSqlRepository
    extends SqlRepository<StudySetVocabMap>
    implements StudySetVocabMapRepository
{
    constructor(
        @InjectModel(StudySetVocabMapModel)
        private readonly studySetVocabMapModel: ModelCtor<StudySetVocabMapModel>,
    ) {
        super(studySetVocabMapModel, {
            dataPartition: { mapping: "dataPartitionCode" },
        });
    }
}

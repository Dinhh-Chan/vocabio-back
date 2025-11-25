import { StudySetModel } from "@module/repository/sequelize/model/study-set.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { StudySet } from "../entities/study-set.entity";
import { StudySetRepository } from "./study-set-repository.interface";

export class StudySetSqlRepository
    extends SqlRepository<StudySet>
    implements StudySetRepository
{
    constructor(
        @InjectModel(StudySetModel)
        private readonly studySetModel: ModelCtor<StudySetModel>,
    ) {
        super(studySetModel, {
            dataPartition: { mapping: "dataPartitionCode" },
        });
    }
}

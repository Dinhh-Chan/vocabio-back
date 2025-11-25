import { SrsProgressModel } from "@module/repository/sequelize/model/srs-progress.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { SrsProgress } from "../entities/srs-progress.entity";
import { SrsProgressRepository } from "./srs-progress-repository.interface";

export class SrsProgressSqlRepository
    extends SqlRepository<SrsProgress>
    implements SrsProgressRepository
{
    constructor(
        @InjectModel(SrsProgressModel)
        private readonly srsProgressModel: ModelCtor<SrsProgressModel>,
    ) {
        super(srsProgressModel);
    }
}

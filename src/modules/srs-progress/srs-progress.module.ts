import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { SrsProgressModel } from "@module/repository/sequelize/model/srs-progress.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SrsProgressController } from "./controller/srs-progress.controller";
import { SrsProgressSqlRepository } from "./repository/srs-progress-sql.repository";
import { SrsProgressService } from "./service/srs-progress.service";

@Module({
    imports: [SequelizeModule.forFeature([SrsProgressModel])],
    controllers: [SrsProgressController],
    providers: [
        SrsProgressService,
        RepositoryProvider(Entity.SRS_PROGRESS, SrsProgressSqlRepository),
        TransactionProvider(SqlTransaction),
    ],
    exports: [SrsProgressService],
})
export class SrsProgressModule {}

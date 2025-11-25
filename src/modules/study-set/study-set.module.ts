import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { StudySetModel } from "@module/repository/sequelize/model/study-set.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StudySetController } from "./controller/study-set.controller";
import { StudySetSqlRepository } from "./repository/study-set-sql.repository";
import { StudySetService } from "./service/study-set.service";

@Module({
    imports: [SequelizeModule.forFeature([StudySetModel])],
    controllers: [StudySetController],
    providers: [
        StudySetService,
        RepositoryProvider(Entity.STUDY_SET, StudySetSqlRepository),
        TransactionProvider(SqlTransaction),
    ],
    exports: [StudySetService],
})
export class StudySetModule {}

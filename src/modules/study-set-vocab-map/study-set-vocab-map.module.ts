import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { StudySetVocabMapModel } from "@module/repository/sequelize/model/study-set-vocab-map.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StudySetVocabMapController } from "./controller/study-set-vocab-map.controller";
import { StudySetVocabMapSqlRepository } from "./repository/study-set-vocab-map-sql.repository";
import { StudySetVocabMapService } from "./service/study-set-vocab-map.service";

@Module({
    imports: [SequelizeModule.forFeature([StudySetVocabMapModel])],
    controllers: [StudySetVocabMapController],
    providers: [
        StudySetVocabMapService,
        RepositoryProvider(
            Entity.STUDY_SET_VOCAB_MAP,
            StudySetVocabMapSqlRepository,
        ),
        TransactionProvider(SqlTransaction),
    ],
    exports: [StudySetVocabMapService],
})
export class StudySetVocabMapModule {}

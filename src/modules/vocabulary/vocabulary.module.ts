import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { VocabularyModel } from "@module/repository/sequelize/model/vocabulary.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { VocabularyController } from "./controller/vocabulary.controller";
import { VocabularySqlRepository } from "./repository/vocabulary-sql.repository";
import { VocabularyService } from "./service/vocabulary.service";

@Module({
    imports: [SequelizeModule.forFeature([VocabularyModel])],
    controllers: [VocabularyController],
    providers: [
        VocabularyService,
        RepositoryProvider(Entity.VOCABULARY, VocabularySqlRepository),
        TransactionProvider(SqlTransaction),
    ],
    exports: [VocabularyService],
})
export class VocabularyModule {}

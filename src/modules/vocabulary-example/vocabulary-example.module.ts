import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { VocabularyExampleModel } from "@module/repository/sequelize/model/vocabulary-example.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { VocabularyExampleController } from "./controller/vocabulary-example.controller";
import { VocabularyExampleSqlRepository } from "./repository/vocabulary-example-sql.repository";
import { VocabularyExampleService } from "./service/vocabulary-example.service";

@Module({
    imports: [SequelizeModule.forFeature([VocabularyExampleModel])],
    controllers: [VocabularyExampleController],
    providers: [
        VocabularyExampleService,
        RepositoryProvider(
            Entity.VOCABULARY_EXAMPLE,
            VocabularyExampleSqlRepository,
        ),
        TransactionProvider(SqlTransaction),
    ],
    exports: [VocabularyExampleService],
})
export class VocabularyExampleModule {}

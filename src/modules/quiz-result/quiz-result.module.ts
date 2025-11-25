import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { QuizResultModel } from "@module/repository/sequelize/model/quiz-result.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { QuizResultController } from "./controller/quiz-result.controller";
import { QuizResultSqlRepository } from "./repository/quiz-result-sql.repository";
import { QuizResultService } from "./service/quiz-result.service";

@Module({
    imports: [SequelizeModule.forFeature([QuizResultModel])],
    controllers: [QuizResultController],
    providers: [
        QuizResultService,
        RepositoryProvider(Entity.QUIZ_RESULT, QuizResultSqlRepository),
        TransactionProvider(SqlTransaction),
    ],
    exports: [QuizResultService],
})
export class QuizResultModule {}

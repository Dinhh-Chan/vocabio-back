import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { QuizAnswerModel } from "@module/repository/sequelize/model/quiz-answer.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { QuizAnswerController } from "./controller/quiz-answer.controller";
import { QuizAnswerSqlRepository } from "./repository/quiz-answer-sql.repository";
import { QuizAnswerService } from "./service/quiz-answer.service";

@Module({
    imports: [SequelizeModule.forFeature([QuizAnswerModel])],
    controllers: [QuizAnswerController],
    providers: [
        QuizAnswerService,
        RepositoryProvider(Entity.QUIZ_ANSWER, QuizAnswerSqlRepository),
        TransactionProvider(SqlTransaction),
    ],
    exports: [QuizAnswerService],
})
export class QuizAnswerModule {}

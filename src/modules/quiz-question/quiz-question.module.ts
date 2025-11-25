import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { QuizQuestionModel } from "@module/repository/sequelize/model/quiz-question.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { QuizQuestionController } from "./controller/quiz-question.controller";
import { QuizQuestionSqlRepository } from "./repository/quiz-question-sql.repository";
import { QuizQuestionService } from "./service/quiz-question.service";

@Module({
    imports: [SequelizeModule.forFeature([QuizQuestionModel])],
    controllers: [QuizQuestionController],
    providers: [
        QuizQuestionService,
        RepositoryProvider(Entity.QUIZ_QUESTION, QuizQuestionSqlRepository),
        TransactionProvider(SqlTransaction),
    ],
    exports: [QuizQuestionService],
})
export class QuizQuestionModule {}

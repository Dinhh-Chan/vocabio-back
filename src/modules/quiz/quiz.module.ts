import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { QuizModel } from "@module/repository/sequelize/model/quiz.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { QuizController } from "./controller/quiz.controller";
import { QuizSqlRepository } from "./repository/quiz-sql.repository";
import { QuizService } from "./service/quiz.service";

@Module({
    imports: [SequelizeModule.forFeature([QuizModel])],
    controllers: [QuizController],
    providers: [
        QuizService,
        RepositoryProvider(Entity.QUIZ, QuizSqlRepository),
        TransactionProvider(SqlTransaction),
    ],
    exports: [QuizService],
})
export class QuizModule {}

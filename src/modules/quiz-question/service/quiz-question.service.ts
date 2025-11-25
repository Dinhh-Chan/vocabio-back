import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { QuizQuestion } from "../entities/quiz-question.entity";
import { QuizQuestionRepository } from "../repository/quiz-question-repository.interface";

@Injectable()
export class QuizQuestionService extends BaseService<
    QuizQuestion,
    QuizQuestionRepository
> {
    constructor(
        @InjectRepository(Entity.QUIZ_QUESTION)
        private readonly quizQuestionRepository: QuizQuestionRepository,
        @InjectTransaction()
        private readonly quizQuestionTransaction: BaseTransaction,
    ) {
        super(quizQuestionRepository, {
            notFoundCode: "error-quiz-question-not-found",
            transaction: quizQuestionTransaction,
        });
    }
}

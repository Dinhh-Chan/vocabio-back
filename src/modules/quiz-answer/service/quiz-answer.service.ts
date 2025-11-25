import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { QuizAnswer } from "../entities/quiz-answer.entity";
import { QuizAnswerRepository } from "../repository/quiz-answer-repository.interface";

@Injectable()
export class QuizAnswerService extends BaseService<
    QuizAnswer,
    QuizAnswerRepository
> {
    constructor(
        @InjectRepository(Entity.QUIZ_ANSWER)
        private readonly quizAnswerRepository: QuizAnswerRepository,
        @InjectTransaction()
        private readonly quizAnswerTransaction: BaseTransaction,
    ) {
        super(quizAnswerRepository, {
            notFoundCode: "error-quiz-answer-not-found",
            transaction: quizAnswerTransaction,
        });
    }
}

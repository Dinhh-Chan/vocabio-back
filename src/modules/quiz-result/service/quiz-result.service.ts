import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { QuizResult } from "../entities/quiz-result.entity";
import { QuizResultRepository } from "../repository/quiz-result-repository.interface";

@Injectable()
export class QuizResultService extends BaseService<
    QuizResult,
    QuizResultRepository
> {
    constructor(
        @InjectRepository(Entity.QUIZ_RESULT)
        private readonly quizResultRepository: QuizResultRepository,
        @InjectTransaction()
        private readonly quizResultTransaction: BaseTransaction,
    ) {
        super(quizResultRepository, {
            notFoundCode: "error-quiz-result-not-found",
            transaction: quizResultTransaction,
        });
    }
}

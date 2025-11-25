import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { Quiz } from "../entities/quiz.entity";
import { QuizRepository } from "../repository/quiz-repository.interface";

@Injectable()
export class QuizService extends BaseService<Quiz, QuizRepository> {
    constructor(
        @InjectRepository(Entity.QUIZ)
        private readonly quizRepository: QuizRepository,
        @InjectTransaction()
        private readonly quizTransaction: BaseTransaction,
    ) {
        super(quizRepository, {
            notFoundCode: "error-quiz-not-found",
            transaction: quizTransaction,
        });
    }
}

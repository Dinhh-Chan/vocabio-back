import { QuizAnswerModel } from "@module/repository/sequelize/model/quiz-answer.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { QuizAnswer } from "../entities/quiz-answer.entity";
import { QuizAnswerRepository } from "./quiz-answer-repository.interface";

export class QuizAnswerSqlRepository
    extends SqlRepository<QuizAnswer>
    implements QuizAnswerRepository
{
    constructor(
        @InjectModel(QuizAnswerModel)
        private readonly quizAnswerModel: ModelCtor<QuizAnswerModel>,
    ) {
        super(quizAnswerModel);
    }
}

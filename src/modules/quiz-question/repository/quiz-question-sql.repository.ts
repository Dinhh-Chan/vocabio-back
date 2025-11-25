import { QuizQuestionModel } from "@module/repository/sequelize/model/quiz-question.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { QuizQuestion } from "../entities/quiz-question.entity";
import { QuizQuestionRepository } from "./quiz-question-repository.interface";

export class QuizQuestionSqlRepository
    extends SqlRepository<QuizQuestion>
    implements QuizQuestionRepository
{
    constructor(
        @InjectModel(QuizQuestionModel)
        private readonly quizQuestionModel: ModelCtor<QuizQuestionModel>,
    ) {
        super(quizQuestionModel);
    }
}

import { QuizModel } from "@module/repository/sequelize/model/quiz.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { Quiz } from "../entities/quiz.entity";
import { QuizRepository } from "./quiz-repository.interface";

export class QuizSqlRepository
    extends SqlRepository<Quiz>
    implements QuizRepository
{
    constructor(
        @InjectModel(QuizModel)
        private readonly quizModel: ModelCtor<QuizModel>,
    ) {
        super(quizModel);
    }
}

import { QuizResultModel } from "@module/repository/sequelize/model/quiz-result.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { QuizResult } from "../entities/quiz-result.entity";
import { QuizResultRepository } from "./quiz-result-repository.interface";

export class QuizResultSqlRepository
    extends SqlRepository<QuizResult>
    implements QuizResultRepository
{
    constructor(
        @InjectModel(QuizResultModel)
        private readonly quizResultModel: ModelCtor<QuizResultModel>,
    ) {
        super(quizResultModel);
    }
}

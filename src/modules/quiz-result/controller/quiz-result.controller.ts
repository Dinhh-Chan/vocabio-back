import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QuizResult } from "../entities/quiz-result.entity";
import { QuizResultService } from "../service/quiz-result.service";
import { ConditionQuizResultDto } from "../dto/condition-quiz-result.dto";
import { CreateQuizResultDto } from "../dto/create-quiz-result.dto";
import { UpdateQuizResultDto } from "../dto/update-quiz-result.dto";

@Controller("quiz-results")
@ApiTags("quiz-results")
export class QuizResultController extends BaseControllerFactory<QuizResult>(
    QuizResult,
    ConditionQuizResultDto,
    CreateQuizResultDto,
    UpdateQuizResultDto,
    {
        import: { enable: false },
    },
) {
    constructor(private readonly quizResultService: QuizResultService) {
        super(quizResultService);
    }
}

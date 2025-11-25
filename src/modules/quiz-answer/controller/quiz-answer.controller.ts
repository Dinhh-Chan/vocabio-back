import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QuizAnswer } from "../entities/quiz-answer.entity";
import { QuizAnswerService } from "../service/quiz-answer.service";
import { ConditionQuizAnswerDto } from "../dto/condition-quiz-answer.dto";
import { CreateQuizAnswerDto } from "../dto/create-quiz-answer.dto";
import { UpdateQuizAnswerDto } from "../dto/update-quiz-answer.dto";

@Controller("quiz-answers")
@ApiTags("quiz-answers")
export class QuizAnswerController extends BaseControllerFactory<QuizAnswer>(
    QuizAnswer,
    ConditionQuizAnswerDto,
    CreateQuizAnswerDto,
    UpdateQuizAnswerDto,
    {
        import: { enable: false },
    },
) {
    constructor(private readonly quizAnswerService: QuizAnswerService) {
        super(quizAnswerService);
    }
}

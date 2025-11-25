import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QuizQuestion } from "../entities/quiz-question.entity";
import { QuizQuestionService } from "../service/quiz-question.service";
import { ConditionQuizQuestionDto } from "../dto/condition-quiz-question.dto";
import { CreateQuizQuestionDto } from "../dto/create-quiz-question.dto";
import { UpdateQuizQuestionDto } from "../dto/update-quiz-question.dto";

@Controller("quiz-questions")
@ApiTags("quiz-questions")
export class QuizQuestionController extends BaseControllerFactory<QuizQuestion>(
    QuizQuestion,
    ConditionQuizQuestionDto,
    CreateQuizQuestionDto,
    UpdateQuizQuestionDto,
    {
        import: { enable: false },
    },
) {
    constructor(private readonly quizQuestionService: QuizQuestionService) {
        super(quizQuestionService);
    }
}

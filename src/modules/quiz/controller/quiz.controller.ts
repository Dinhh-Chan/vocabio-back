import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Quiz } from "../entities/quiz.entity";
import { QuizService } from "../service/quiz.service";
import { ConditionQuizDto } from "../dto/condition-quiz.dto";
import { CreateQuizDto } from "../dto/create-quiz.dto";
import { UpdateQuizDto } from "../dto/update-quiz.dto";

@Controller("quizzes")
@ApiTags("quizzes")
export class QuizController extends BaseControllerFactory<Quiz>(
    Quiz,
    ConditionQuizDto,
    CreateQuizDto,
    UpdateQuizDto,
    {
        import: { enable: false },
    },
) {
    constructor(private readonly quizService: QuizService) {
        super(quizService);
    }
}

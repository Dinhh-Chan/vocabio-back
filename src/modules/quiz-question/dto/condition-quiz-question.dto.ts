import { PartialType } from "@nestjs/mapped-types";
import { QuizQuestion } from "../entities/quiz-question.entity";

export class ConditionQuizQuestionDto extends PartialType(QuizQuestion) {}

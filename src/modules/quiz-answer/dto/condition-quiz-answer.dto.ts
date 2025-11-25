import { PartialType } from "@nestjs/mapped-types";
import { QuizAnswer } from "../entities/quiz-answer.entity";

export class ConditionQuizAnswerDto extends PartialType(QuizAnswer) {}

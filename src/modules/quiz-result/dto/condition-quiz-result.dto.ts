import { PartialType } from "@nestjs/mapped-types";
import { QuizResult } from "../entities/quiz-result.entity";

export class ConditionQuizResultDto extends PartialType(QuizResult) {}

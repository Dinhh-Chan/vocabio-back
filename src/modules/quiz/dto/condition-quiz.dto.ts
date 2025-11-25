import { PartialType } from "@nestjs/mapped-types";
import { Quiz } from "../entities/quiz.entity";

export class ConditionQuizDto extends PartialType(Quiz) {}

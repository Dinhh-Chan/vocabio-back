import { EntityDefinition } from "@common/constant/class/entity-definition";
import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateQuizAnswerDto {
    @IsString()
    @EntityDefinition.field({ label: "Question ID", required: true })
    questionId: string;

    @IsString()
    @EntityDefinition.field({ label: "Answer Text", required: true })
    answerText: string;

    @IsBoolean()
    @EntityDefinition.field({ label: "Is Correct", required: true })
    isCorrect: boolean;

    @IsOptional()
    @IsInt()
    @Min(0)
    @EntityDefinition.field({ label: "Sort Order" })
    sortOrder?: number;
}

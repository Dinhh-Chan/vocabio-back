import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";

export class QuizAnswer implements BaseEntity {
    @StrObjectId()
    _id: string;

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

    createdAt?: Date;
}

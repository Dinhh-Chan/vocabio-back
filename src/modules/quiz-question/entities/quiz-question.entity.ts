import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class QuizQuestion implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Quiz ID", required: true })
    quizId: string;

    @IsString()
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocabularyId: string;

    @IsString()
    @EntityDefinition.field({ label: "Question Type", required: true })
    questionType: string;

    @IsString()
    @EntityDefinition.field({ label: "Question Text", required: true })
    questionText: string;

    @IsOptional()
    @IsString()
    @EntityDefinition.field({ label: "Audio URL" })
    audioUrl?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @EntityDefinition.field({ label: "Sort Order" })
    sortOrder?: number;

    createdAt?: Date;
}

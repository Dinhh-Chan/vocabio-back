import { EntityDefinition } from "@common/constant/class/entity-definition";
import {
    IsDate,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from "class-validator";

export class CreateSrsProgressDto {
    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    userId: string;

    @IsString()
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocabularyId: string;

    @IsInt()
    @Min(1)
    @EntityDefinition.field({ label: "Interval", required: true })
    interval: number;

    @IsNumber()
    @EntityDefinition.field({ label: "Easiness", required: true })
    easiness: number;

    @IsInt()
    @Min(0)
    @EntityDefinition.field({ label: "Repetitions", required: true })
    repetitions: number;

    @IsOptional()
    @IsDate()
    @EntityDefinition.field({ label: "Next Review At" })
    nextReviewAt?: Date;

    @IsOptional()
    @IsDate()
    @EntityDefinition.field({ label: "Last Review At" })
    lastReviewAt?: Date;
}

import { EntityDefinition } from "@common/constant/class/entity-definition";
import { IsOptional, IsString } from "class-validator";

export class CreateQuizDto {
    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    userId: string;

    @IsOptional()
    @IsString()
    @EntityDefinition.field({ label: "Study Set ID" })
    studySetId?: string;

    @IsString()
    @EntityDefinition.field({ label: "Quiz Type", required: true })
    type: string;

    @IsString()
    @EntityDefinition.field({ label: "Title", required: true })
    title: string;
}

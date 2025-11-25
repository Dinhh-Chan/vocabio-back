import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsOptional, IsString } from "class-validator";

export class Quiz implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    userId: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Study Set ID" })
    studySetId?: string;

    @IsString()
    @EntityDefinition.field({ label: "Quiz Type", required: true })
    type: string;

    @IsString()
    @EntityDefinition.field({ label: "Title", required: true })
    title: string;

    createdAt?: Date;
    updatedAt?: Date;
}

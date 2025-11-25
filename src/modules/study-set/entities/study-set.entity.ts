import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class StudySet implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    userId: string;

    @IsString()
    @EntityDefinition.field({ label: "Title", required: true })
    title: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Description" })
    description?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Cover Image" })
    coverImage?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Difficulty" })
    difficulty?: number;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Is Public" })
    isPublic?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    dataPartitionCode?: string;
}

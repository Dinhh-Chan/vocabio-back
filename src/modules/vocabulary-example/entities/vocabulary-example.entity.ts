import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export enum ExampleCreatedBy {
    USER = "user",
    AI = "ai",
}

export class VocabularyExample implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocabularyId: string;

    @IsString()
    @EntityDefinition.field({ label: "Example Text", required: true })
    exampleText: string;

    @IsEnum(ExampleCreatedBy)
    @EntityDefinition.field({
        label: "Created By",
        enum: Object.values(ExampleCreatedBy),
        example: ExampleCreatedBy.USER,
    })
    createdBy: ExampleCreatedBy;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Sort Order" })
    sortOrder?: number;

    createdAt?: Date;
    updatedAt?: Date;
    dataPartitionCode?: string;
}

import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class Vocabulary implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    userId: string;

    @IsString()
    @EntityDefinition.field({ label: "Word", required: true })
    word: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Definition" })
    definition?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "IPA" })
    ipa?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Audio URL" })
    audioUrl?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Priority" })
    priority?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Learned Count" })
    learnedCount?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Edited Count" })
    editedCount?: number;

    createdAt?: Date;
    updatedAt?: Date;
    dataPartitionCode?: string;
}

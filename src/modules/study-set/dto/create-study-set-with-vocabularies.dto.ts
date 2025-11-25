import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { CreateVocabularyDto } from "./create-vocabulary.dto";

export class CreateStudySetWithVocabulariesDto {
    @IsString()
    @EntityDefinition.field({ label: "Title", required: true })
    title: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Description" })
    description?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Difficulty" })
    difficulty?: number;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Is Public" })
    isPublic?: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateVocabularyDto)
    @EntityDefinition.field({ label: "Vocabularies", required: true })
    vocabularies: CreateVocabularyDto[];
}

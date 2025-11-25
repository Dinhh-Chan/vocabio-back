import { IsNumber, IsOptional, IsString } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class CreateVocabularyDto {
    @IsString()
    @EntityDefinition.field({ label: "Word", required: true })
    word: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Word Language" })
    wordLanguage?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Definition" })
    definition?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Definition Language" })
    definitionLanguage?: string;

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
}

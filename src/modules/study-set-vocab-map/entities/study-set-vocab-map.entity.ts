import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class StudySetVocabMap implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Study Set ID", required: true })
    studySetId: string;

    @IsString()
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocabularyId: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Sort Order" })
    sortOrder?: number;

    createdAt?: Date;
    updatedAt?: Date;
    dataPartitionCode?: string;
}

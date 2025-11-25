import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsOptional, IsString } from "class-validator";

export class Folder implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    userId: string;

    @IsString()
    @EntityDefinition.field({ label: "Folder Name", required: true })
    name: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Parent Folder" })
    parentId?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

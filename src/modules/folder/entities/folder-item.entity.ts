import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export const FolderItemTypes = ["study_set", "quiz", "class"] as const;
export type FolderItemType = (typeof FolderItemTypes)[number];

export class FolderItem implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Folder ID", required: true })
    folderId: string;

    @IsString()
    @IsIn(FolderItemTypes as unknown as string[])
    @EntityDefinition.field({ label: "Item Type", required: true })
    itemType: FolderItemType;

    @IsString()
    @EntityDefinition.field({ label: "Item ID", required: true })
    itemId: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @EntityDefinition.field({ label: "Sort Order" })
    sortOrder?: number;

    createdAt?: Date;
    updatedAt?: Date;
}

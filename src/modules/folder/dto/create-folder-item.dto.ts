import { EntityDefinition } from "@common/constant/class/entity-definition";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";
import {
    FolderItemType,
    FolderItemTypes,
} from "../entities/folder-item.entity";

export class CreateFolderItemDto {
    @IsString()
    @EntityDefinition.field({ label: "Folder ID", required: true })
    folderId: string;

    @IsString()
    @IsIn(FolderItemTypes as unknown as FolderItemType[])
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
}

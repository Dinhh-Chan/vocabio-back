import { EntityDefinition } from "@common/constant/class/entity-definition";
import { IsOptional, IsString } from "class-validator";

export class CreateFolderDto {
    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    userId: string;

    @IsString()
    @EntityDefinition.field({ label: "Folder Name", required: true })
    name: string;

    @IsOptional()
    @IsString()
    @EntityDefinition.field({ label: "Parent Folder" })
    parentId?: string;
}

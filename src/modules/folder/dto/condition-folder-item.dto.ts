import { PartialType } from "@nestjs/mapped-types";
import { FolderItem } from "../entities/folder-item.entity";

export class ConditionFolderItemDto extends PartialType(FolderItem) {}

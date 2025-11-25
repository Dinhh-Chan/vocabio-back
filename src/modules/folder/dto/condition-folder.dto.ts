import { PartialType } from "@nestjs/mapped-types";
import { Folder } from "../entities/folder.entity";

export class ConditionFolderDto extends PartialType(Folder) {}

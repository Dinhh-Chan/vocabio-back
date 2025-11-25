import { PartialType } from "@nestjs/mapped-types";
import { CreateFolderItemDto } from "./create-folder-item.dto";

export class UpdateFolderItemDto extends PartialType(CreateFolderItemDto) {}

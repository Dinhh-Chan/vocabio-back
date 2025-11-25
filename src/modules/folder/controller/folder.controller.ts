import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Folder } from "../entities/folder.entity";
import { FolderService } from "../service/folder.service";
import { ConditionFolderDto } from "../dto/condition-folder.dto";
import { CreateFolderDto } from "../dto/create-folder.dto";
import { UpdateFolderDto } from "../dto/update-folder.dto";

@Controller("folders")
@ApiTags("folders")
export class FolderController extends BaseControllerFactory<Folder>(
    Folder,
    ConditionFolderDto,
    CreateFolderDto,
    UpdateFolderDto,
    {
        import: {
            enable: false,
        },
    },
) {
    constructor(private readonly folderService: FolderService) {
        super(folderService);
    }
}

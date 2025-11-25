import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FolderItem } from "../entities/folder-item.entity";
import { FolderItemService } from "../service/folder-item.service";
import { ConditionFolderItemDto } from "../dto/condition-folder-item.dto";
import { CreateFolderItemDto } from "../dto/create-folder-item.dto";
import { UpdateFolderItemDto } from "../dto/update-folder-item.dto";

@Controller("folder-items")
@ApiTags("folder-items")
export class FolderItemController extends BaseControllerFactory<FolderItem>(
    FolderItem,
    ConditionFolderItemDto,
    CreateFolderItemDto,
    UpdateFolderItemDto,
    {
        import: {
            enable: false,
        },
    },
) {
    constructor(private readonly folderItemService: FolderItemService) {
        super(folderItemService);
    }
}

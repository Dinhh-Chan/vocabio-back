import { FolderItemModel } from "@module/repository/sequelize/model/folder-item.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { FolderItem } from "../entities/folder-item.entity";
import { FolderItemRepository } from "./folder-item-repository.interface";

export class FolderItemSqlRepository
    extends SqlRepository<FolderItem>
    implements FolderItemRepository
{
    constructor(
        @InjectModel(FolderItemModel)
        private readonly folderItemModel: ModelCtor<FolderItemModel>,
    ) {
        super(folderItemModel);
    }
}

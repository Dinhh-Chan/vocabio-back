import { FolderModel } from "@module/repository/sequelize/model/folder.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { Folder } from "../entities/folder.entity";
import { FolderRepository } from "./folder-repository.interface";

export class FolderSqlRepository
    extends SqlRepository<Folder>
    implements FolderRepository
{
    constructor(
        @InjectModel(FolderModel)
        private readonly folderModel: ModelCtor<FolderModel>,
    ) {
        super(folderModel);
    }
}

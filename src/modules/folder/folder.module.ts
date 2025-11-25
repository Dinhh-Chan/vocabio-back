import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { FolderItemModel } from "@module/repository/sequelize/model/folder-item.model";
import { FolderModel } from "@module/repository/sequelize/model/folder.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FolderItemController } from "./controller/folder-item.controller";
import { FolderController } from "./controller/folder.controller";
import { FolderItemSqlRepository } from "./repository/folder-item-sql.repository";
import { FolderSqlRepository } from "./repository/folder-sql.repository";
import { FolderItemService } from "./service/folder-item.service";
import { FolderService } from "./service/folder.service";

@Module({
    imports: [SequelizeModule.forFeature([FolderModel, FolderItemModel])],
    controllers: [FolderController, FolderItemController],
    providers: [
        FolderService,
        FolderItemService,
        RepositoryProvider(Entity.FOLDER, FolderSqlRepository),
        RepositoryProvider(Entity.FOLDER_ITEM, FolderItemSqlRepository),
        TransactionProvider(SqlTransaction),
    ],
    exports: [FolderService, FolderItemService],
})
export class FolderModule {}

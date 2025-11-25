import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { FolderItem } from "../entities/folder-item.entity";
import { FolderItemRepository } from "../repository/folder-item-repository.interface";

@Injectable()
export class FolderItemService extends BaseService<
    FolderItem,
    FolderItemRepository
> {
    constructor(
        @InjectRepository(Entity.FOLDER_ITEM)
        private readonly folderItemRepository: FolderItemRepository,
        @InjectTransaction()
        private readonly folderItemTransaction: BaseTransaction,
    ) {
        super(folderItemRepository, {
            notFoundCode: "error-folder-item-not-found",
            transaction: folderItemTransaction,
        });
    }
}

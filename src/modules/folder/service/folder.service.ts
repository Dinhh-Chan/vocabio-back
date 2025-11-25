import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { Folder } from "../entities/folder.entity";
import { FolderRepository } from "../repository/folder-repository.interface";

@Injectable()
export class FolderService extends BaseService<Folder, FolderRepository> {
    constructor(
        @InjectRepository(Entity.FOLDER)
        private readonly folderRepository: FolderRepository,
        @InjectTransaction()
        private readonly folderTransaction: BaseTransaction,
    ) {
        super(folderRepository, {
            notFoundCode: "error-folder-not-found",
            transaction: folderTransaction,
        });
    }
}

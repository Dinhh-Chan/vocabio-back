import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { Injectable } from "@nestjs/common";
import { SrsProgress } from "../entities/srs-progress.entity";
import { SrsProgressRepository } from "../repository/srs-progress-repository.interface";

@Injectable()
export class SrsProgressService extends BaseService<
    SrsProgress,
    SrsProgressRepository
> {
    constructor(
        @InjectRepository(Entity.SRS_PROGRESS)
        private readonly srsProgressRepository: SrsProgressRepository,
        @InjectTransaction()
        private readonly srsProgressTransaction: BaseTransaction,
    ) {
        super(srsProgressRepository, {
            notFoundCode: "error-srs-progress-not-found",
            transaction: srsProgressTransaction,
        });
    }
}

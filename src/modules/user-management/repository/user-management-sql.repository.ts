import { createUserPassword, CreateQuery } from "@common/constant";
import { UserModel } from "@module/repository/sequelize/model/user.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import {
    BaseCommandOption,
    CreateDocument,
} from "@module/repository/common/base-repository.interface";
import { InjectModel } from "@nestjs/sequelize";
import { Transaction } from "sequelize";
import { ModelCtor } from "sequelize-typescript";
import { UserManagement } from "../entities/user-management.entity";
import { UserManagementRepository } from "./user-management-repository.interface";

export class UserManagementSqlRepository
    extends SqlRepository<UserManagement>
    implements UserManagementRepository
{
    constructor(
        @InjectModel(UserModel)
        private readonly userModel: ModelCtor<UserModel>,
    ) {
        super(userModel, { dataPartition: { mapping: "dataPartitionCode" } });
    }

    async create(
        document: CreateDocument<UserManagement>,
        query?: CreateQuery<UserManagement> & BaseCommandOption<Transaction>,
    ): Promise<UserManagement> {
        // Hash password nếu có và chưa được hash (không bắt đầu bằng $2b$)
        if (document.password && !document.password.startsWith("$2b$")) {
            document.password = await createUserPassword(document.password);
        }
        return super.create(document, query);
    }
}

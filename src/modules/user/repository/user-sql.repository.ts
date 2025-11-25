import { createUserPassword } from "@common/constant";
import { CreateQuery } from "@common/constant";
import { UserModel } from "@module/repository/sequelize/model/user.model";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import {
    BaseCommandOption,
    CreateDocument,
} from "@module/repository/common/base-repository.interface";
import { InjectModel } from "@nestjs/sequelize";
import { Transaction } from "sequelize";
import { ModelCtor } from "sequelize-typescript";
import { User } from "../entities/user.entity";
import { UserRepository } from "./user-repository.interface";

export class UserSqlRepository
    extends SqlRepository<User>
    implements UserRepository
{
    constructor(
        @InjectModel(UserModel)
        private readonly userModel: ModelCtor<UserModel>,
    ) {
        super(userModel, { dataPartition: { mapping: "dataPartitionCode" } });
    }

    async create(
        document: CreateDocument<User>,
        query?: CreateQuery<User> & BaseCommandOption<Transaction>,
    ): Promise<User> {
        // Hash password nếu có và chưa được hash (không bắt đầu bằng $2b$)
        if (document.password && !document.password.startsWith("$2b$")) {
            document.password = await createUserPassword(document.password);
        }
        return super.create(document, query);
    }

    async getMe(user: User): Promise<User> {
        const res = await this.userModel.findOne({
            where: { username: user.username },
        });
        return res?.toJSON() || null;
    }
}

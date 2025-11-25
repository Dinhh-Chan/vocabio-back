import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { UserModel } from "@module/repository/sequelize/model/user.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { SettingModule } from "@module/setting/setting.module";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserManagementController } from "./controller/user-management.controller";
import { UserManagementSqlRepository } from "./repository/user-management-sql.repository";
import { UserManagementService } from "./service/user-management.service";

@Module({
    imports: [SequelizeModule.forFeature([UserModel]), SettingModule],
    controllers: [UserManagementController],
    providers: [
        UserManagementService,
        RepositoryProvider(Entity.USER, UserManagementSqlRepository),
        TransactionProvider(SqlTransaction),
    ],
    exports: [UserManagementService],
})
export class UserManagementModule {}

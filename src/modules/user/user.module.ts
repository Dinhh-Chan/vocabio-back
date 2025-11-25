import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { UserModel } from "@module/repository/sequelize/model/user.model";
import { SqlTransaction } from "@module/repository/sequelize/sql.transaction";
import { SettingModule } from "@module/setting/setting.module";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserImportController } from "./controller/user-import.controller";
import { UserController } from "./controller/user.controller";
import { UserSqlRepository } from "./repository/user-sql.repository";
import { UserImportService } from "./service/user-import.service";
import { UserService } from "./service/user.service";

@Module({
    imports: [SequelizeModule.forFeature([UserModel]), SettingModule],
    controllers: [UserController, UserImportController],
    providers: [
        UserService,
        UserImportService,
        RepositoryProvider(Entity.USER, UserSqlRepository),
        TransactionProvider(SqlTransaction),
    ],
    exports: [UserService],
})
export class UserModule {}

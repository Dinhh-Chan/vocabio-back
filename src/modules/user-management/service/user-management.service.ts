import { createUserPassword } from "@common/constant";
import { Configuration } from "@config/configuration";
import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { SettingKey } from "@module/setting/common/constant";
import { SettingService } from "@module/setting/setting.service";
import { SystemRole } from "@module/user/common/constant";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserManagement } from "../entities/user-management.entity";
import { UserManagementRepository } from "../repository/user-management-repository.interface";

@Injectable()
export class UserManagementService
    extends BaseService<UserManagement, UserManagementRepository>
    implements OnApplicationBootstrap
{
    constructor(
        @InjectRepository(Entity.USER)
        private readonly userManagementRepository: UserManagementRepository,
        @InjectTransaction()
        private readonly userManagementTransaction: BaseTransaction,
        private readonly settingService: SettingService,
        private readonly configService: ConfigService<Configuration>,
    ) {
        super(userManagementRepository, {
            notFoundCode: "error-user-not-found",
            transaction: userManagementTransaction,
        });
    }

    async onApplicationBootstrap() {
        try {
            Logger.log("[UserManagement] Starting admin initialization...");

            const { defaultAdminUsername, defaultAdminPassword } =
                this.configService.get("server", {
                    infer: true,
                });

            if (!defaultAdminUsername || !defaultAdminPassword) {
                Logger.warn(
                    "[UserManagement] Admin credentials not configured in environment",
                );
                return;
            }

            Logger.log(
                `[UserManagement] Checking for admin user: ${defaultAdminUsername}`,
            );

            // Luôn kiểm tra xem admin đã tồn tại chưa (không phụ thuộc vào setting)
            const existingAdmin = await this.userManagementRepository.getOne(
                {
                    username: defaultAdminUsername,
                },
                { enableDataPartition: false },
            );

            if (!existingAdmin) {
                Logger.log(
                    `[UserManagement] Admin user not found, creating new admin...`,
                );

                const hashedPassword =
                    await createUserPassword(defaultAdminPassword);
                Logger.log(
                    `[UserManagement] Original password: ${defaultAdminPassword}`,
                );
                Logger.log(
                    `[UserManagement] Hashed password length: ${hashedPassword.length}`,
                );
                Logger.log(
                    `[UserManagement] Hashed password starts with: ${hashedPassword.substring(0, 20)}...`,
                );

                const createData = {
                    username: defaultAdminUsername,
                    email: "admin@administrator.com",
                    password: hashedPassword,
                    systemRole: SystemRole.ADMIN,
                    fullname: "Administrator",
                };

                const createdAdmin = await this.userManagementRepository.create(
                    createData,
                    { enableDataPartition: false },
                );

                Logger.log(
                    `✅ Admin user created successfully: ${defaultAdminUsername} (ID: ${createdAdmin._id})`,
                );
                Logger.log(
                    `[UserManagement] Created admin password in DB: ${createdAdmin.password?.substring(0, 20) || "NULL"}...`,
                );

                // Cập nhật setting sau khi tạo thành công
                const setting = await this.settingService.getSettingValue(
                    SettingKey.INIT_DATA,
                );
                const update = setting || {};
                update.isAdminCreated = true;
                await this.settingService.setSettingValue(
                    SettingKey.INIT_DATA,
                    update,
                );
            } else {
                Logger.log(
                    `ℹ️  Admin user already exists: ${defaultAdminUsername} (ID: ${existingAdmin._id})`,
                );
                Logger.log(
                    `[UserManagement] Existing admin password length: ${existingAdmin.password?.length || 0}`,
                );
                if (
                    existingAdmin.password &&
                    !existingAdmin.password.startsWith("$2b$")
                ) {
                    Logger.warn(
                        `[UserManagement] WARNING: Admin password is not hashed! Updating password...`,
                    );
                    const hashedPassword =
                        await createUserPassword(defaultAdminPassword);
                    await this.userManagementRepository.updateById(
                        existingAdmin._id,
                        { password: hashedPassword },
                        { enableDataPartition: false },
                    );
                    Logger.log(`✅ Admin password has been updated and hashed`);
                }
            }
        } catch (error) {
            Logger.error(
                "Failed to initialize admin user",
                error.stack,
                "UserManagementService",
            );
            Logger.error(`[UserManagement] Error details: ${error.message}`);
        }
    }

    async internalGetById(id: string) {
        return this.userManagementRepository.getById(id, {
            enableDataPartition: false,
        });
    }
}

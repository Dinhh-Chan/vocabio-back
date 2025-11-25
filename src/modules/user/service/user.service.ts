import { createUserPassword } from "@common/constant";
import { RequestAuthData } from "@common/constant/class/request-auth-data";
import { Configuration } from "@config/configuration";
import { ApiError } from "@config/exception/api-error";
import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { SettingKey } from "@module/setting/common/constant";
import { SettingService } from "@module/setting/setting.service";
import { CreateUserDto } from "@module/user/dto/create-user.dto";
import { UserRepository } from "@module/user/repository/user-repository.interface";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import bcrypt from "bcryptjs";
import { SystemRole } from "../common/constant";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService
    extends BaseService<User, UserRepository>
    implements OnApplicationBootstrap
{
    constructor(
        @InjectRepository(Entity.USER)
        private readonly userRepository: UserRepository,
        private readonly settingService: SettingService,
        private readonly configService: ConfigService<Configuration>,
        @InjectTransaction()
        private readonly userTransaction: BaseTransaction,
    ) {
        super(userRepository, {
            notFoundCode: "error-user-not-found",
            transaction: userTransaction,
        });
    }

    async testUser() {
        await this.userRepository.distinct("", { asd: 1 });
        const user = await this.userRepository.updateOne(
            {
                username: "admin",
            },
            {
                $inc: { __v: -1 },
                fullname: 1,
            },
        );
        return user;
    }

    async onApplicationBootstrap() {
        try {
            Logger.log("[UserService] Starting admin initialization...");

            const { defaultAdminUsername, defaultAdminPassword } =
                this.configService.get("server", {
                    infer: true,
                });

            if (!defaultAdminUsername || !defaultAdminPassword) {
                Logger.warn(
                    "[UserService] Admin credentials not configured in environment",
                );
                return;
            }

            Logger.log(
                `[UserService] Checking for admin user: ${defaultAdminUsername}`,
            );

            // Luôn kiểm tra xem admin đã tồn tại chưa (không phụ thuộc vào setting)
            const existingAdmin = await this.userRepository.getOne(
                {
                    username: defaultAdminUsername,
                },
                { enableDataPartition: false },
            );

            if (!existingAdmin) {
                Logger.log(
                    `[UserService] Admin user not found, creating new admin...`,
                );

                const hashedPassword =
                    await createUserPassword(defaultAdminPassword);
                Logger.log(
                    `[UserService] Original password: ${defaultAdminPassword}`,
                );
                Logger.log(
                    `[UserService] Hashed password length: ${hashedPassword.length}`,
                );
                Logger.log(
                    `[UserService] Hashed password starts with: ${hashedPassword.substring(0, 20)}...`,
                );

                const createData = {
                    username: defaultAdminUsername,
                    email: "admin@administrator.com",
                    password: hashedPassword,
                    systemRole: SystemRole.ADMIN,
                    fullname: "Administrator",
                };

                const createdAdmin = await this.userRepository.create(
                    createData,
                    { enableDataPartition: false },
                );

                Logger.log(
                    `✅ Admin user created successfully: ${defaultAdminUsername} (ID: ${createdAdmin._id})`,
                );
                Logger.log(
                    `[UserService] Created admin password in DB: ${createdAdmin.password?.substring(0, 20) || "NULL"}...`,
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
                    `[UserService] Existing admin password length: ${existingAdmin.password?.length || 0}`,
                );
                if (
                    existingAdmin.password &&
                    !existingAdmin.password.startsWith("$2b$")
                ) {
                    Logger.warn(
                        `[UserService] WARNING: Admin password is not hashed! Updating password...`,
                    );
                    const hashedPassword =
                        await createUserPassword(defaultAdminPassword);
                    await this.userRepository.updateById(
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
                "UserService",
            );
            Logger.error(`[UserService] Error details: ${error.message}`);
        }
    }

    async internalGetById(id: string) {
        return this.userRepository.getById(id, { enableDataPartition: false });
    }

    async getMe(authData: RequestAuthData) {
        const user = await authData.getUser();
        return user;
    }

    async create(user: User, dto: CreateUserDto): Promise<User> {
        // dto.password = await createUserPassword(dto.password);
        const t = await this.userTransaction.startTransaction();
        try {
            const res = await this.userRepository.create(dto, {
                transaction: t,
            });
            await this.userTransaction.commitTransaction(t);
            return res;
        } catch (err) {
            await this.userTransaction.abortTransaction(t);
            throw err;
        }
    }

    async changePasswordMe(user: User, dto: ChangePasswordDto) {
        const correctOldPassword = await this.comparePassword(
            user,
            dto.oldPass,
        );
        if (!correctOldPassword) {
            throw ApiError.BadRequest("error-old-password-wrong");
        }
        user.password = await createUserPassword(dto.newPass);
        const res = await this.userRepository.updateById(user._id, {
            password: dto.oldPass,
        });
        return res;
    }

    async comparePassword(user: User, password: string) {
        return bcrypt.compare(password, user.password);
    }
}

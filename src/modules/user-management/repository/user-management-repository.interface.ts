import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserManagement } from "../entities/user-management.entity";

export interface UserManagementRepository
    extends BaseRepository<UserManagement> {}

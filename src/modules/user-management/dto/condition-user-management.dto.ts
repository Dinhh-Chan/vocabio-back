import { PartialType } from "@nestjs/mapped-types";
import { UserManagement } from "../entities/user-management.entity";

export class ConditionUserManagementDto extends PartialType(UserManagement) {}

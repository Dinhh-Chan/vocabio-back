import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserManagement } from "../entities/user-management.entity";
import { UserManagementService } from "../service/user-management.service";
import { ConditionUserManagementDto } from "../dto/condition-user-management.dto";
import { CreateUserManagementDto } from "../dto/create-user-management.dto";
import { UpdateUserManagementDto } from "../dto/update-user-management.dto";

@Controller("user-management")
@ApiTags("user-management")
export class UserManagementController extends BaseControllerFactory<UserManagement>(
    UserManagement,
    ConditionUserManagementDto,
    CreateUserManagementDto,
    UpdateUserManagementDto,
    {
        import: { enable: false },
    },
) {
    constructor(private readonly userManagementService: UserManagementService) {
        super(userManagementService);
    }
}

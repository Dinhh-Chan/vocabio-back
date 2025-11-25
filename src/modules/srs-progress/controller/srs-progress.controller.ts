import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SrsProgress } from "../entities/srs-progress.entity";
import { SrsProgressService } from "../service/srs-progress.service";
import { ConditionSrsProgressDto } from "../dto/condition-srs-progress.dto";
import { CreateSrsProgressDto } from "../dto/create-srs-progress.dto";
import { UpdateSrsProgressDto } from "../dto/update-srs-progress.dto";

@Controller("srs-progress")
@ApiTags("srs-progress")
export class SrsProgressController extends BaseControllerFactory<SrsProgress>(
    SrsProgress,
    ConditionSrsProgressDto,
    CreateSrsProgressDto,
    UpdateSrsProgressDto,
    {
        import: { enable: false },
    },
) {
    constructor(private readonly srsProgressService: SrsProgressService) {
        super(srsProgressService);
    }
}

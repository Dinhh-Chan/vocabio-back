import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ReqUser } from "@common/decorator/auth.decorator";
import { User } from "@module/user/entities/user.entity";
import { SrsProgress } from "../entities/srs-progress.entity";
import { SrsProgressService } from "../service/srs-progress.service";
import { ConditionSrsProgressDto } from "../dto/condition-srs-progress.dto";
import { CreateSrsProgressDto } from "../dto/create-srs-progress.dto";
import { UpdateSrsProgressDto } from "../dto/update-srs-progress.dto";
import { ReviewFlashcardDto } from "../dto/review-flashcard.dto";
import { ApiRecordResponse } from "@common/decorator/api.decorator";

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

    @Post("review-flashcard")
    @ApiBody({ type: ReviewFlashcardDto })
    @ApiRecordResponse(SrsProgress, {
        operator: {
            summary: "Review Flashcard",
            description:
                "Cập nhật SRS progress khi người dùng vuốt flashcard (sang phải = đã nhớ, sang trái = chưa nhớ)",
        },
        response: {
            description: "Updated SRS Progress data",
        },
    })
    async reviewFlashcard(
        @ReqUser() user: User,
        @Body() dto: ReviewFlashcardDto,
    ) {
        return this.srsProgressService.reviewFlashcard(user, dto);
    }
}

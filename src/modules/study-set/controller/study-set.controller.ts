import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { ReqUser } from "@common/decorator/auth.decorator";
import { User } from "@module/user/entities/user.entity";
import { StudySet } from "../entities/study-set.entity";
import { StudySetService } from "../service/study-set.service";
import { CreateStudySetWithVocabulariesDto } from "../dto/create-study-set-with-vocabularies.dto";
import { ApiRecordResponse } from "@common/decorator/api.decorator";

@Controller("study-set")
@ApiTags("study-set")
export class StudySetController extends BaseControllerFactory<StudySet>(
    StudySet,
    null,
    null,
    null,
    {
        import: {
            enable: true,
        },
        routes: {
            create: {
                enable: true,
                document: {
                    operator: {
                        summary: "Create a new Study Set",
                        description: "Create a new study set record",
                    },
                    response: { description: "Created Study Set data" },
                },
            },
        },
        dataPartition: {
            enable: true,
        },
    },
) {
    constructor(private readonly studySetService: StudySetService) {
        super(studySetService);
    }

    @Post("with-vocabularies")
    @ApiBody({ type: CreateStudySetWithVocabulariesDto })
    @ApiRecordResponse(StudySet, {
        operator: {
            summary: "Create Study Set with Vocabularies",
            description:
                "Create a new study set along with its vocabularies in one request",
        },
        response: {
            description: "Created Study Set and Vocabularies data",
        },
    })
    async createWithVocabularies(
        @ReqUser() user: User,
        @Body() dto: CreateStudySetWithVocabulariesDto,
    ) {
        return this.studySetService.createWithVocabularies(user, dto);
    }

    @Get(":id/full-info")
    @ApiParam({ name: "id", description: "Study Set ID" })
    @ApiRecordResponse(StudySet, {
        operator: {
            summary: "Get Study Set Full Information",
            description:
                "Get study set with all its vocabularies and learning status",
        },
        response: {
            description: "Study Set with Vocabularies and Status data",
        },
    })
    async getFullInfo(@ReqUser() user: User, @Param("id") id: string) {
        return this.studySetService.getFullInfoWithStatus(user, id);
    }
}

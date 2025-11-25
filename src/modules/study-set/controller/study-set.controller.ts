import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StudySet } from "../entities/study-set.entity";
import { StudySetService } from "../service/study-set.service";

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
}

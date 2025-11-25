import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StudySetVocabMap } from "../entities/study-set-vocab-map.entity";
import { StudySetVocabMapService } from "../service/study-set-vocab-map.service";

@Controller("study-set-vocab-map")
@ApiTags("study-set-vocab-map")
export class StudySetVocabMapController extends BaseControllerFactory<StudySetVocabMap>(
    StudySetVocabMap,
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
                        summary: "Create a new Study Set Vocabulary Map",
                        description:
                            "Create a new study set vocabulary mapping record",
                    },
                    response: {
                        description: "Created Study Set Vocabulary Map data",
                    },
                },
            },
        },
        dataPartition: {
            enable: true,
        },
    },
) {
    constructor(
        private readonly studySetVocabMapService: StudySetVocabMapService,
    ) {
        super(studySetVocabMapService);
    }
}

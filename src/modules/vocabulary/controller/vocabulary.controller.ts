import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Vocabulary } from "../entities/vocabulary.entity";
import { VocabularyService } from "../service/vocabulary.service";

@Controller("vocabulary")
@ApiTags("vocabulary")
export class VocabularyController extends BaseControllerFactory<Vocabulary>(
    Vocabulary,
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
                        summary: "Create a new Vocabulary",
                        description: "Create a new vocabulary record",
                    },
                    response: { description: "Created Vocabulary data" },
                },
            },
        },
        dataPartition: {
            enable: true,
        },
    },
) {
    constructor(private readonly vocabularyService: VocabularyService) {
        super(vocabularyService);
    }
}

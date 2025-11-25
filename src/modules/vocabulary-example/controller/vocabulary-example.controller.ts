import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { VocabularyExample } from "../entities/vocabulary-example.entity";
import { VocabularyExampleService } from "../service/vocabulary-example.service";

@Controller("vocabulary-example")
@ApiTags("vocabulary-example")
export class VocabularyExampleController extends BaseControllerFactory<VocabularyExample>(
    VocabularyExample,
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
                        summary: "Create a new Vocabulary Example",
                        description: "Create a new vocabulary example record",
                    },
                    response: {
                        description: "Created Vocabulary Example data",
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
        private readonly vocabularyExampleService: VocabularyExampleService,
    ) {
        super(vocabularyExampleService);
    }
}

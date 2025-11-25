import { IsEnum, IsString } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export enum FlashcardAction {
    KNOW = "know", // Vuốt sang phải - đã nhớ
    DONT_KNOW = "dont_know", // Vuốt sang trái - chưa nhớ
}

export class ReviewFlashcardDto {
    @IsString()
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocabularyId: string;

    @IsEnum(FlashcardAction)
    @EntityDefinition.field({
        label: "Action",
        required: true,
        enum: Object.values(FlashcardAction),
        example: FlashcardAction.KNOW,
    })
    action: FlashcardAction;
}

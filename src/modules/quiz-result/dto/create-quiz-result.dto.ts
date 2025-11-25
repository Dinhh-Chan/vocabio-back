import { EntityDefinition } from "@common/constant/class/entity-definition";
import { IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateQuizResultDto {
    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    userId: string;

    @IsString()
    @EntityDefinition.field({ label: "Quiz ID", required: true })
    quizId: string;

    @IsNumber()
    @EntityDefinition.field({ label: "Score", required: true })
    score: number;

    @IsInt()
    @Min(0)
    @EntityDefinition.field({ label: "Total Questions", required: true })
    totalQuestions: number;

    @IsInt()
    @Min(0)
    @EntityDefinition.field({ label: "Correct Answers", required: true })
    correctAnswers: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @EntityDefinition.field({ label: "Time Taken (s)" })
    timeTaken?: number;
}

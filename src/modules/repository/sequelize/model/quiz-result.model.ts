import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { QuizResult } from "@module/quiz-result/entities/quiz-result.entity";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.QUIZ_RESULT,
    timestamps: true,
    indexes: [
        { fields: ["user_id"] },
        { fields: ["quiz_id"] },
        { fields: ["user_id", "quiz_id"] },
    ],
})
export class QuizResultModel extends Model implements QuizResult {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "user_id" })
    userId: string;

    @Column({ allowNull: false, field: "quiz_id" })
    quizId: string;

    @Column({ allowNull: false, type: DataType.FLOAT })
    score: number;

    @Column({ allowNull: false, field: "total_questions" })
    totalQuestions: number;

    @Column({ allowNull: false, field: "correct_answers" })
    correctAnswers: number;

    @Column({ allowNull: true, field: "time_taken" })
    timeTaken?: number;
}

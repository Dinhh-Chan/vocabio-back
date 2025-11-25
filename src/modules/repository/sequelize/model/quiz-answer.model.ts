import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { QuizAnswer } from "@module/quiz-answer/entities/quiz-answer.entity";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.QUIZ_ANSWER,
    timestamps: true,
    indexes: [{ fields: ["question_id"] }],
})
export class QuizAnswerModel extends Model implements QuizAnswer {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "question_id" })
    questionId: string;

    @Column({ allowNull: false, type: DataType.TEXT, field: "answer_text" })
    answerText: string;

    @Column({ field: "is_correct", defaultValue: false })
    isCorrect: boolean;

    @Column({ field: "sort_order", defaultValue: 0 })
    sortOrder?: number;
}

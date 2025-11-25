import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { QuizQuestion } from "@module/quiz-question/entities/quiz-question.entity";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.QUIZ_QUESTION,
    timestamps: true,
    indexes: [{ fields: ["quiz_id"] }, { fields: ["vocabulary_id"] }],
})
export class QuizQuestionModel extends Model implements QuizQuestion {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "quiz_id" })
    quizId: string;

    @Column({ allowNull: false, field: "vocabulary_id" })
    vocabularyId: string;

    @Column({ allowNull: false, field: "question_type" })
    questionType: string;

    @Column({ allowNull: false, type: DataType.TEXT, field: "question_text" })
    questionText: string;

    @Column({ allowNull: true, type: DataType.TEXT, field: "audio_url" })
    audioUrl?: string;

    @Column({ field: "sort_order", defaultValue: 0 })
    sortOrder?: number;
}

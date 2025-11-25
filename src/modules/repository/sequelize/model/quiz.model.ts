import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Quiz } from "@module/quiz/entities/quiz.entity";
import { Column, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.QUIZ,
    timestamps: true,
    indexes: [{ fields: ["user_id"] }, { fields: ["study_set_id"] }],
})
export class QuizModel extends Model implements Quiz {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "user_id" })
    userId: string;

    @Column({ allowNull: true, field: "study_set_id" })
    studySetId?: string;

    @Column({ allowNull: false })
    type: string;

    @Column({ allowNull: false })
    title: string;
}

import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { SrsProgress } from "@module/srs-progress/entities/srs-progress.entity";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.SRS_PROGRESS,
    timestamps: true,
    indexes: [
        { fields: ["user_id"] },
        { fields: ["vocabulary_id"] },
        { fields: ["next_review_at"] },
        { fields: ["user_id", "vocabulary_id"], unique: true },
        { fields: ["user_id", "next_review_at"] },
    ],
})
export class SrsProgressModel extends Model implements SrsProgress {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "user_id" })
    userId: string;

    @Column({ allowNull: false, field: "vocabulary_id" })
    vocabularyId: string;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 1 })
    interval: number;

    @Column({ allowNull: false, type: DataType.FLOAT, defaultValue: 2.5 })
    easiness: number;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    repetitions: number;

    @Column({ field: "next_review_at", type: DataType.DATE })
    nextReviewAt?: Date;

    @Column({ field: "last_review_at", type: DataType.DATE })
    lastReviewAt?: Date;
}

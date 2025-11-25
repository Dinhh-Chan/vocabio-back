import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { StudySetVocabMap } from "@module/study-set-vocab-map/entities/study-set-vocab-map.entity";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.STUDY_SET_VOCAB_MAP,
    timestamps: true,
    indexes: [
        { fields: ["study_set_id"] },
        { fields: ["vocabulary_id"] },
        { fields: ["sort_order"] },
        { fields: ["study_set_id", "vocabulary_id"], unique: true },
        { fields: ["dataPartitionCode"] },
    ],
})
export class StudySetVocabMapModel extends Model implements StudySetVocabMap {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "study_set_id" })
    studySetId: string;

    @Column({ allowNull: false, field: "vocabulary_id" })
    vocabularyId: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0, field: "sort_order" })
    sortOrder?: number;

    @Column({})
    dataPartitionCode?: string;
}

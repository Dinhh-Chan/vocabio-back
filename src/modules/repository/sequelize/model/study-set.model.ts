import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { StudySet } from "@module/study-set/entities/study-set.entity";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.STUDY_SET,
    timestamps: true,
    indexes: [
        { fields: ["user_id"] },
        { fields: ["is_public"] },
        { fields: ["dataPartitionCode"] },
    ],
})
export class StudySetModel extends Model implements StudySet {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "user_id" })
    userId: string;

    @Column({ allowNull: false })
    title: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    description?: string;

    @Column({ allowNull: true, field: "cover_image" })
    coverImage?: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    difficulty?: number;

    @Column({ type: DataType.BOOLEAN, defaultValue: false, field: "is_public" })
    isPublic?: boolean;

    @Column({})
    dataPartitionCode?: string;
}

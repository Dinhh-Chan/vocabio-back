import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import {
    ExampleCreatedBy,
    VocabularyExample,
} from "@module/vocabulary-example/entities/vocabulary-example.entity";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.VOCABULARY_EXAMPLE,
    timestamps: true,
    indexes: [{ fields: ["vocabulary_id"] }, { fields: ["dataPartitionCode"] }],
})
export class VocabularyExampleModel extends Model implements VocabularyExample {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "vocabulary_id" })
    vocabularyId: string;

    @Column({ type: DataType.TEXT, allowNull: false, field: "example_text" })
    exampleText: string;

    @Column({
        type: DataType.ENUM(...Object.values(ExampleCreatedBy)),
        allowNull: false,
        field: "created_by",
        defaultValue: ExampleCreatedBy.USER,
    })
    createdBy: ExampleCreatedBy;

    @Column({ type: DataType.INTEGER, defaultValue: 0, field: "sort_order" })
    sortOrder?: number;

    @Column({})
    dataPartitionCode?: string;
}

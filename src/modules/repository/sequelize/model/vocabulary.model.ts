import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Vocabulary } from "@module/vocabulary/entities/vocabulary.entity";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.VOCABULARY,
    timestamps: true,
    indexes: [
        { fields: ["user_id"] },
        { fields: ["word"] },
        { fields: ["dataPartitionCode"] },
    ],
})
export class VocabularyModel extends Model implements Vocabulary {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "user_id" })
    userId: string;

    @Column({ allowNull: false })
    word: string;

    @Column({ allowNull: true, field: "word_language" })
    wordLanguage?: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    definition?: string;

    @Column({ allowNull: true, field: "definition_language" })
    definitionLanguage?: string;

    @Column({ allowNull: true })
    ipa?: string;

    @Column({ type: DataType.TEXT, allowNull: true, field: "audio_url" })
    audioUrl?: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    priority?: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0, field: "learned_count" })
    learnedCount?: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0, field: "edited_count" })
    editedCount?: number;

    @Column({})
    dataPartitionCode?: string;
}

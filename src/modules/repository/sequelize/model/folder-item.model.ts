import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import {
    FolderItem,
    FolderItemType,
} from "@module/folder/entities/folder-item.entity";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.FOLDER_ITEM,
    timestamps: true,
    indexes: [
        { fields: ["folder_id"] },
        { fields: ["item_type", "item_id"] },
        { fields: ["folder_id", "item_type", "item_id"], unique: true },
    ],
})
export class FolderItemModel extends Model implements FolderItem {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "folder_id" })
    folderId: string;

    @Column({
        allowNull: false,
        field: "item_type",
        type: DataType.STRING,
    })
    itemType: FolderItemType;

    @Column({ allowNull: false, field: "item_id" })
    itemId: string;

    @Column({ field: "sort_order", defaultValue: 0 })
    sortOrder?: number;
}

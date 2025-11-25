import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Folder } from "@module/folder/entities/folder.entity";
import { Column, Model, Table } from "sequelize-typescript";

@Table({
    tableName: Entity.FOLDER,
    timestamps: true,
    indexes: [
        { fields: ["user_id"] },
        { fields: ["parent_id"] },
        { fields: ["user_id", "parent_id", "name"], unique: true },
    ],
})
export class FolderModel extends Model implements Folder {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, field: "user_id" })
    userId: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: true, field: "parent_id" })
    parentId?: string;
}

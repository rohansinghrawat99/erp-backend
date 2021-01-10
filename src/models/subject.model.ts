import {
    AutoIncrement, BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import { StandardSubject } from "./standard-subject.model";
import { Standard } from "./standard.model";

@Table({
    timestamps: true,
    paranoid: false,
    tableName: "subjects"
})
export class Subject extends Model<Subject> {

    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique
    @Column(DataType.STRING)
    code: string;

    @Column(DataType.STRING)
    name: string;

    @BelongsToMany(() => Standard, () => StandardSubject)
    standards?: Standard[];
}

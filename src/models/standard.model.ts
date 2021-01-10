import {
    AutoIncrement, BelongsTo, BelongsToMany,
    Column,
    DataType, ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import { Employee } from "./employee.model";
import { Subject } from "./subject.model";
import { StandardSubject } from "./standard-subject.model";

@Table({
    timestamps: true,
    paranoid: false,
    tableName: "standards"
})
export class Standard extends Model<Standard> {

    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique
    @Column(DataType.STRING)
    name: string;

    @ForeignKey(() => Employee)
    @Column(DataType.BIGINT)
    class_teacher_id: number;

    @BelongsTo(() => Employee)
    classTeacher: Employee;

    @BelongsToMany(() => Subject, () => StandardSubject)
    subjects?: Subject[];
}

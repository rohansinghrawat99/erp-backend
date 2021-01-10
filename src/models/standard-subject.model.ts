import {
    AutoIncrement, BelongsTo,
    Column,
    DataType, ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import { Standard } from "./standard.model";
import { Subject } from "./subject.model";
import { Employee } from "./employee.model";

@Table({
    timestamps: true,
    paranoid: false,
    tableName: "standard_subjects"
})
export class StandardSubject extends Model<StandardSubject> {

    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @ForeignKey(() => Standard)
    @Column(DataType.BIGINT)
    standard_id: number;

    @ForeignKey(() => Subject)
    @Column(DataType.BIGINT)
    subject_id: number;

    @ForeignKey(() => Employee)
    @Column(DataType.BIGINT)
    subject_teacher_id: number;

    @BelongsTo(() => Standard)
    standard: Standard;

    @BelongsTo(() => Subject)
    subject: Subject;

    @BelongsTo(() => Employee)
    subjectTeacher: Employee;
}

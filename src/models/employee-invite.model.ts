import {
    AutoIncrement, BelongsTo,
    Column,
    DataType, ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import { Employee } from "./employee.model";

@Table({
    timestamps: true,
    paranoid: false,
    tableName: "employee_invites"
})
export class EmployeeInvite extends Model<EmployeeInvite> {

    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique
    @Column(DataType.STRING)
    code: string;

    @ForeignKey(() => Employee)
    @Column(DataType.BIGINT)
    employee_id: number;

    @BelongsTo(() => Employee)
    employee: Employee;
}

import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType, Default,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import { Helpers } from "../util/helpers.util";
import { EmployeeStatus, EmployeeType } from "../util/enum.util";
import bcrypt from "bcrypt";

@Table({
    timestamps: true,
    paranoid: false,
    tableName: "employees"
})
export class Employee extends Model<Employee> {

    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique
    @Column(DataType.STRING)
    emp_id: string;

    @Column(DataType.STRING)
    first_name: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    middle_name: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    last_name: string;

    @Column(DataType.STRING)
    email: string;

    @Default("secret")
    @Column({
        type: DataType.STRING,
        set: function (this: Employee, value: string) {
            this.setDataValue("password", bcrypt.hashSync(value, bcrypt.genSaltSync()));
        }
    })
    password: string;

    @Column(DataType.ENUM(...Helpers.iterateEnum<EmployeeType>(EmployeeType)))
    type: EmployeeType;

    @AllowNull(true)
    @Column(DataType.STRING)
    profile_pic_url: string;

    @Default(EmployeeStatus.INVITED)
    @Column(DataType.ENUM(...Helpers.iterateEnum<EmployeeStatus>(EmployeeStatus)))
    status: EmployeeStatus;
}

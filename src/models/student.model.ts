import {
    AllowNull,
    AutoIncrement, BelongsTo,
    Column,
    DataType, ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import { Standard } from "./standard.model";
import { Helpers } from "../util/helpers.util";
import { EmployeeType, House } from "../util/enum.util";

@Table({
    timestamps: true,
    paranoid: false,
    tableName: "students"
})
export class Student extends Model<Student> {

    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique
    @Column(DataType.STRING)
    admission_number: string;

    @Column(DataType.STRING)
    first_name: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    middle_name: string;

    @Column(DataType.STRING)
    last_name: string;

    @Column(DataType.STRING)
    email: string;

    @ForeignKey(() => Standard)
    @Column(DataType.BIGINT)
    standard_id: number;

    @AllowNull(true)
    @Column(DataType.ENUM(...Helpers.iterateEnum<House>(House)))
    house: House;

    @AllowNull(true)
    @Column(DataType.STRING)
    profile_pic_url: string;

    @BelongsTo(() => Standard)
    standard: Standard;
}

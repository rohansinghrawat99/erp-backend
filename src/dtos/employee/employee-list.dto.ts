import { EmployeeStatus, EmployeeType } from "../../util/enum.util";
import { IndexDto } from "../index.dto";

export interface EmployeeListDto extends IndexDto {
  type?: EmployeeType;
  status?: EmployeeStatus;
}
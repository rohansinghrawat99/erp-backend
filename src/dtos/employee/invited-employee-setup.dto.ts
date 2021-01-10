import { EmployeeType } from "../../util/enum.util";

export interface InvitedEmployeeSetupDto {
  emp_id: string;
  email: string;
  type: EmployeeType;
}
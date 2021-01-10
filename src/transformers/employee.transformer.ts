import { Dictionary } from "async";
import { TransformerAbstract } from "./base/transformer.abstract";
import { Employee } from "../models/employee.model";

export class EmployeeTransformer extends TransformerAbstract<Employee> {

    protected _map(employee: Employee): Dictionary<any> {
        return {
            id: employee.id,
            emp_id: employee.emp_id,
            first_name: employee.first_name,
            middle_name: employee.middle_name,
            last_name: employee.last_name,
            email: employee.email,
            type: employee.type,
            status: employee.status,
            profile_pic_url: employee.profile_pic_url,
            created_at: employee.createdAt,
            updated_at: employee.updatedAt,
        };
    }
}
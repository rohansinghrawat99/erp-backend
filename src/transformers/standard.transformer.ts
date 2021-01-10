import { Dictionary } from "async";
import { TransformerAbstract } from "./base/transformer.abstract";
import { Standard } from "../models/standard.model";
import { isUndefined } from "util";
import { Employee } from "../models/employee.model";
import { EmployeeTransformer } from "./employee.transformer";

export class StandardTransformer extends TransformerAbstract<Standard> {
    defaultIncludes = ["classTeacher"];

    async includeClassTeacher(standard: Standard): Promise<Dictionary<any>> {
        let classTeacher = standard.classTeacher;

        if (!standard.class_teacher_id) {
            return null;
        }
        if (isUndefined(classTeacher)) {
            classTeacher = await standard.$get("classTeacher") as Employee;
        }
        return new EmployeeTransformer().transform(classTeacher);
    }

    protected _map(standard: Standard): Dictionary<any> {
        return {
            id: standard.id,
            admission_number: standard.name,
            first_name: standard.class_teacher_id,
            created_at: standard.createdAt,
            updated_at: standard.updatedAt,
        };
    }
}
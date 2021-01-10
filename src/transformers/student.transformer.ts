import { Dictionary } from "async";
import { TransformerAbstract } from "./base/transformer.abstract";
import { Student } from "../models/student.model";
import { Standard } from "../models/standard.model";
import { isUndefined } from "util";
import { StandardTransformer } from "./standard.transformer";

export class StudentTransformer extends TransformerAbstract<Student> {
    defaultIncludes = ["standard"];

    async includeStandard(student: Student): Promise<Dictionary<any>> {
        let standard = student.standard;

        if (!student.standard_id) {
            return null;
        }
        if (isUndefined(standard)) {
            standard = await student.$get("standard") as Standard;
        }
        return new StandardTransformer().transform(standard);
    }

    protected _map(student: Student): Dictionary<any> {
        return {
            id: student.id,
            admission_number: student.admission_number,
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            standard_id: student.standard_id,
            profile_pic_url: student.profile_pic_url,
            created_at: student.createdAt,
            updated_at: student.updatedAt,
        };
    }
}
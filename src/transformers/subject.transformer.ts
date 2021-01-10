import { Dictionary } from "async";
import { TransformerAbstract } from "./base/transformer.abstract";
import { Subject } from "../models/subject.model";

export class SubjectTransformer extends TransformerAbstract<Subject> {

    protected _map(subject: Subject): Dictionary<any> {
        return {
            id: subject.id,
            code: subject.code,
            name: subject.name,
            created_at: subject.createdAt,
            updated_at: subject.updatedAt,
        };
    }
}
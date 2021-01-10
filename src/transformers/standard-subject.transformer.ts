import { Dictionary } from "async";
import { TransformerAbstract } from "./base/transformer.abstract";
import { Subject } from "../models/subject.model";
import { StandardSubject } from "../models/standard-subject.model";
import { isUndefined } from "util";
import { Standard } from "../models/standard.model";
import { StandardTransformer } from "./standard.transformer";
import { SubjectTransformer } from "./subject.transformer";

export class StandardSubjectTransformer extends TransformerAbstract<StandardSubject> {
    defaultIncludes = ["standard", "subject"];

    async includeStandard(standardSubject: StandardSubject): Promise<Dictionary<any>> {
        let standard = standardSubject.standard;

        if (!standardSubject.standard_id) {
            return null;
        }
        if (isUndefined(standard)) {
            standard = await standardSubject.$get("standard") as Standard;
        }
        return new StandardTransformer().transform(standard);
    }

    async includeSubject(standardSubject: StandardSubject): Promise<Dictionary<any>> {
        let subject = standardSubject.subject;

        if (!standardSubject.subject_id) {
            return null;
        }
        if (isUndefined(subject)) {
            subject = await standardSubject.$get("subject") as Subject;
        }
        return new SubjectTransformer().transform(subject);
    }
    protected _map(standardSubject: StandardSubject): Dictionary<any> {
        return {
            id: standardSubject.id,
            standard_id: standardSubject.standard_id,
            subject_id: standardSubject.subject_id,
            created_at: standardSubject.createdAt,
            updated_at: standardSubject.updatedAt,
        };
    }
}
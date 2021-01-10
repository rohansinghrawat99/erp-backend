import { dbService } from "../services/db.service";
import { StandardSubject } from "../models/standard-subject.model";
import { Standard } from "../models/standard.model";
import { Subject } from "../models/subject.model";
import { Employee } from "../models/employee.model";
import { EmployeeType } from "../util/enum.util";
import * as faker from "faker";

dbService; // Initialising Sequelize...


const standardSubjects: any[] = [
    {
        standard_id: 1,
        subject_id: 2,
        subject_teacher_id: 2
    },
    {
        standard_id: 1,
        subject_id: 3,
        subject_teacher_id: 3
    },
    {
        standard_id: 1,
        subject_id: 5,
        subject_teacher_id: 4
    },
    {
        standard_id: 1,
        subject_id: 10,
        subject_teacher_id: 5
    },
    {
        standard_id: 2,
        subject_id: 2,
        subject_teacher_id: 6
    },
    {
        standard_id: 2,
        subject_id: 3,
        subject_teacher_id: 7
    },
    {
        standard_id: 2,
        subject_id: 5,
        subject_teacher_id: 8
    },
    {
        standard_id: 2,
        subject_id: 10,
        subject_teacher_id: 9
    },
    {
        standard_id: 3,
        subject_id: 2,
        subject_teacher_id: 10
    },
    {
        standard_id: 3,
        subject_id: 3,
        subject_teacher_id: 11
    },
    {
        standard_id: 3,
        subject_id: 5,
        subject_teacher_id: 12
    },
    {
        standard_id: 3,
        subject_id: 10,
        subject_teacher_id: 13
    },
    {
        standard_id: 4,
        subject_id: 2,
        subject_teacher_id: 14
    },
    {
        standard_id: 4,
        subject_id: 3,
        subject_teacher_id: 15
    },
    {
        standard_id: 4,
        subject_id: 5,
        subject_teacher_id: 16
    },
    {
        standard_id: 4,
        subject_id: 10,
        subject_teacher_id: 17
    },
    {
        standard_id: 5,
        subject_id: 2,
        subject_teacher_id: 18
    },
    {
        standard_id: 5,
        subject_id: 3,
        subject_teacher_id: 19
    },
    {
        standard_id: 5,
        subject_id: 5,
        subject_teacher_id: 20
    },
    {
        standard_id: 5,
        subject_id: 10,
        subject_teacher_id: 21
    }
];

export = {

    up: async () => {
        const standards = await Standard.findAll();
        const subjects = await Subject.findAll();
        const employees = await Employee.findAll({
            where: {
                type: EmployeeType.TEACHER
            }
        });

        for (let i = 6; i <= 41; i++) {
            for (let j = 0; j <= 9; j++) {
                standardSubjects.push({
                    standard_id: standards[i].id,
                    subject_id: subjects[j].id,
                    subject_teacher_id: faker.random.arrayElement(employees).id
                });
            }
        }

        return StandardSubject.bulkCreate(standardSubjects);
    },

    down: async () => {
        return StandardSubject.truncate();
    }
};

import { dbService } from "../services/db.service";
import { Subject } from "../models/subject.model";

dbService; // Initialising Sequelize...


const subjects: any[] = [
    {
        code: "081",
        name: "Chemistry"
    },
    {
        code: "082",
        name: "Physics"
    },
    {
        code: "083",
        name: "Mathematics"
    },
    {
        code: "084",
        name: "Hindi"
    },
    {
        code: "085",
        name: "Biology"
    },
    {
        code: "086",
        name: "Computer"
    },
    {
        code: "087",
        name: "Physical Education"
    },
    {
        code: "091",
        name: "Chemistry Lab"
    },
    {
        code: "092",
        name: "Physics Lab"
    },
    {
        code: "096",
        name: "Computer Lab"
    },
    {
        code: "089",
        name: "English"
    }
];

export = {

    up: async () => {
        return Subject.bulkCreate(subjects);
    },

    down: async () => {
        return Subject.truncate();
    }
};

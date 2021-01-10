import { dbService } from "../services/db.service";
import { Standard } from "../models/standard.model";

dbService; // Initialising Sequelize...


const standards: any[] = [
    {
        name: "NurseryA",
        class_teacher_id: 1
    },
    {
        name: "NurseryB",
        class_teacher_id: 2
    },
    {
        name: "NurseryC",
        class_teacher_id: 4
    },
    {
        name: "KindergartenA",
        class_teacher_id: 5
    },
    {
        name: "KindergartenB",
        class_teacher_id: 6
    },
    {
        name: "KindergartenC",
        class_teacher_id: 7
    },
    {
        name: "1A",
        class_teacher_id: 8
    },
    {
        name: "1B",
        class_teacher_id: 9
    },
    {
        name: "1C",
        class_teacher_id: 10
    },
    {
        name: "2A",
        class_teacher_id: 11
    },
    {
        name: "2B",
        class_teacher_id: 12
    },
    {
        name: "2C",
        class_teacher_id: 13
    },
    {
        name: "3A",
        class_teacher_id: 14
    },
    {
        name: "3B",
        class_teacher_id: 15
    },
    {
        name: "3C",
        class_teacher_id: 16
    },
    {
        name: "4A",
        class_teacher_id: 17
    },
    {
        name: "4B",
        class_teacher_id: 18
    },
    {
        name: "4C",
        class_teacher_id: 19
    },
    {
        name: "5A",
        class_teacher_id: 20
    },
    {
        name: "5B",
        class_teacher_id: 21
    },
    {
        name: "5C",
        class_teacher_id: 22
    },
    {
        name: "6A",
        class_teacher_id: 23
    },
    {
        name: "6B",
        class_teacher_id: 24
    },
    {
        name: "6C",
        class_teacher_id: 25
    },
    {
        name: "7A",
        class_teacher_id: 26
    },
    {
        name: "7B",
        class_teacher_id: 27
    },
    {
        name: "7C",
        class_teacher_id: 28
    },
    {
        name: "8A",
        class_teacher_id: 29
    },
    {
        name: "8B",
        class_teacher_id: 30
    },
    {
        name: "8C",
        class_teacher_id: 31
    },
    {
        name: "9A",
        class_teacher_id: 32
    },
    {
        name: "9B",
        class_teacher_id: 33
    },
    {
        name: "9C",
        class_teacher_id: 34
    },
    {
        name: "10A",
        class_teacher_id: 35
    },
    {
        name: "10B",
        class_teacher_id: 36
    },
    {
        name: "10C",
        class_teacher_id: 37
    },
    {
        name: "11A",
        class_teacher_id: 38
    },
    {
        name: "11B",
        class_teacher_id: 39
    },
    {
        name: "11C",
        class_teacher_id: 40
    },
    {
        name: "12A",
        class_teacher_id: 41
    },
    {
        name: "12B",
        class_teacher_id: 42
    },
    {
        name: "12C",
        class_teacher_id: 43
    }
];

export = {

    up: async () => {
        return Standard.bulkCreate(standards);
    },

    down: async () => {
        return Standard.truncate();
    }
};

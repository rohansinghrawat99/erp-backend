import { dbService } from "../services/db.service";
import faker from "faker";
import { Student } from "../models/student.model";
import { Standard } from "../models/standard.model";
import { House } from "../util/enum.util";
import { Helpers } from "../util/helpers.util";

dbService; // Initialising Sequelize...


const students: any[] = [
    {
        admission_number: "20181095",
        first_name: "Rohan",
        middle_name: "Singh",
        last_name: "Rawat",
        email: "rawatsinghrohan@gmail.com",
        standard_id: 40,
        house: House.HOPE,
        profile_picture_url: "https://images.hdqwalls.com/wallpapers/bthumb/rog-logo-2020-4k-ii.jpg"
    }
];

export = {

    up: async () => {
        const standards = await Standard.findAll();
        for (let j = 0; j < 42; j++) {
            for (let i = 0; i < 20; i++) {
                students.push({
                    admission_number: (Math.floor(Math.random() * (9999999 - 1000 + 1)) + 1000).toString() + ((i >= 6) ? `${standards[i].name}` : `${standards[i + 6].name}`),
                    first_name: faker.name.firstName(),
                    middle_name: faker.name.lastName(),
                    last_name: faker.name.lastName(),
                    email: faker.internet.email(),
                    standard_id: standards[j].id,
                    house: faker.random.arrayElement(Helpers.iterateEnum(House)),
                    profile_picture_url: "https://images.hdqwalls.com/wallpapers/bthumb/rog-logo-2020-4k-ii.jpg"
                });
            }
        }

        return Student.bulkCreate(students);
    },

    down: async () => {
        return Student.truncate();
    }
};

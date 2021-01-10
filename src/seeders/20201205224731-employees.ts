import { dbService } from "../services/db.service";
import faker from "faker";
import { Helpers } from "../util/helpers.util";
import { EmployeeStatus, EmployeeType } from "../util/enum.util";
import { Employee } from "../models/employee.model";

dbService; // Initialising Sequelize...


const employees: any[] = [
    {
        emp_id: "2018bit1095",
        first_name: "Rohan",
        middle_name: "Singh",
        last_name: "Rawat",
        email: "rsrofficial99@gmail.com",
        password: "secret",
        type: EmployeeType.ADMIN,
        profile_pic_url: "https://images.hdqwalls.com/wallpapers/bthumb/rog-logo-2020-4k-ii.jpg",
        status: EmployeeStatus.ACTIVE
    }
];

export = {

    up: async () => {


        for (let i = 0; i < 70; i++) {

            employees.push({
                emp_id: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
                first_name: faker.name.firstName(),
                middle_name: faker.name.lastName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                password: "secret",
                type: faker.random.arrayElement(Helpers.iterateEnum(EmployeeType)),
                profile_pic_url: "https://images.hdqwalls.com/wallpapers/bthumb/rog-logo-2020-4k-ii.jpg",
                status: faker.random.arrayElement(Helpers.iterateEnum(EmployeeStatus))
            });
        }

        return Employee.bulkCreate(employees);
    },

    down: async () => {
        return Employee.truncate();
    }
};

import { dbService } from "../services/db.service";
import { EmployeeInvite } from "../models/employee-invite.model";

dbService; // Initialising Sequelize...


const employeeInvites: any[] = [
    {
        code: "123xyz12334",
        employee_id: 2
    },
    {
        code: "123xyz12335",
        employee_id: 5
    },
    {
        code: "123xyz12336",
        employee_id: 6
    },
    {
        code: "123xyz12337",
        employee_id: 7
    }
];

export = {

    up: async () => {
        return EmployeeInvite.bulkCreate(employeeInvites);
    },

    down: async () => {
        return EmployeeInvite.truncate();
    }
};

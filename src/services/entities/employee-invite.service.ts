import logger from "../../util/logger.util";
import { EmployeeInvite } from "../../models/employee-invite.model";
import { EmployeeInviteCreateDto } from "../../dtos/employee/employee-invite-create.dto";


class EmployeeInviteService {
    private constructor() {
        logger.silly("[erp-backend] EmployeeInviteService");
    }

    static getInstance(): EmployeeInviteService {
        return new EmployeeInviteService();
    }

    async index(): Promise<EmployeeInvite[]> {
        return EmployeeInvite.findAll();
    }

    async showById(id: number): Promise<EmployeeInvite> {
        return EmployeeInvite.findByPk(id);
    }

    async showByEmail(email: string): Promise<EmployeeInvite> {
        return EmployeeInvite.findOne({
            where: {
                email: email
            }
        });
    }

    async create(data: EmployeeInviteCreateDto): Promise<EmployeeInvite> {
        return EmployeeInvite.create({
            ...data
        });
    }

    async showByCode(code: string): Promise<EmployeeInvite> {
        return EmployeeInvite.findOne({
            where: {
                code: code
            }
        });
    }

    // async update(EmployeeInvite: EmployeeInvite, data: EmployeeInviteUpdateDto): Promise<EmployeeInvite> {
    //     return EmployeeInvite.update({
    //         ...data
    //     });
    // }
}

export const employeeInviteService = EmployeeInviteService.getInstance();
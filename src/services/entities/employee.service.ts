import logger from "../../util/logger.util";
import { EmployeeCreateDto } from "../../dtos/employee/employee-create.dto";
import { Employee } from "../../models/employee.model";
import { InvitedEmployeeSetupDto } from "../../dtos/employee/invited-employee-setup.dto";
import { EmployeeStatus } from "../../util/enum.util";
import { EmployeeListDto } from "../../dtos/employee/employee-list.dto";
import Sequelize, { Op, where } from "sequelize";


class EmployeeService {
    private constructor() {
        logger.silly("[tasker-backend] EmployeeService");
    }

    static getInstance(): EmployeeService {
        return new EmployeeService();
    }

    async list(filters: EmployeeListDto): Promise<Employee[]> {
        let whereClause: any = {};
        if (filters.query) {
            whereClause = {
                ...whereClause,
                [Op.or]: {
                    first_name: {
                        [Op.like]: `%${filters.query}%`
                    },
                    middle_name: {
                        [Op.like]: `%${filters.query}%`
                    },
                    last_name: {
                        [Op.like]: `%${filters.query}%`
                    },
                    email: {
                        [Op.like]: `%${filters.query}%`
                    },
                    emp_id: {
                        [Op.like]: `%${filters.query}%`
                    }
                }
            };
        }

        if (filters.status) {
            whereClause = {
                ...whereClause,
                status: filters.status
            };
        } else {
            whereClause = {
                ...whereClause,
                status: EmployeeStatus.ACTIVE
            };
        }

        if (filters.type) {
            whereClause = {
                ...whereClause,
                type: filters.type
            };
        }
        return Employee.findAll({
            where: whereClause
        });
    }

    async showById(id: number): Promise<Employee> {
        return Employee.findByPk(id);
    }

    async showByGoogleId(googleId: string): Promise<Employee> {
        return Employee.findOne({
            where: {
                google_id: googleId
            }
        });
    }

    async showByEmail(email: string): Promise<Employee> {
        return Employee.findOne({
            where: {
                email: email
            }
        });
    }

    async create(data: InvitedEmployeeSetupDto): Promise<Employee> {
        return Employee.create({
            ...data
        });
    }

    async update(employee: Employee, data: EmployeeCreateDto): Promise<Employee> {
        return employee.update({
            emp_id: data.emp_id,
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            profile_pic_url: data.profile_pic_url,
            status: EmployeeStatus.ACTIVE
        });
    }
}

export const employeeService = EmployeeService.getInstance();
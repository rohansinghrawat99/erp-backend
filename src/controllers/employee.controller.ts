import { Request, Response } from "express";
import { EmployeeTransformer } from "../transformers/employee.transformer";
import { EmployeeNotFoundException } from "../exceptions/employee/employee-not-found.exception";
import { employeeService } from "../services/entities/employee.service";
import { EmployeeInviteDto } from "../dtos/employee/employee-invite.dto";
import nodemailer from "nodemailer";
import { Helpers } from "../util/helpers.util";
import { employeeInviteService } from "../services/entities/employee-invite.service";
import { EmployeeStatus, EmployeeType } from "../util/enum.util";
import { EmployeeCreateDto } from "../dtos/employee/employee-create.dto";
import { InvitationNotFoundException } from "../exceptions/employee/invitation-not-found.exception";
import { EmployeeAlreadyRegisteredException } from "../exceptions/employee/employee-already-registered.exception";
import { EmployeeListDto } from "../dtos/employee/employee-list.dto";
import { EmployeeLoginDto } from "../dtos/employee/employee-login.dto";
import bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";
import { ENV_JWT_SECRET } from "../util/secrets.util";
import { WrongPasswordException } from "../exceptions/employee/wrong-password.exception";
import { EmployeeDeactivatedException } from "../exceptions/employee/employee-deactivated.exception";

export class EmployeeController {
    static async list(req: Request, res: Response) {
        const filters = req.query as EmployeeListDto;
        const users = await employeeService.list(filters);
        return res.json({
            data: await (new EmployeeTransformer().transformList(users))
        });
    }

    static async showMe(req: Request, res: Response) {
        return res.json({
            data: await (new EmployeeTransformer().transform(req.employee))
        });
    }

    static async showById(req: Request, res: Response) {
        const userId = +req.params.id;
        const employee = await employeeService.showById(userId);

        if (!employee) {
            throw new EmployeeNotFoundException();
        }

        return res.json({
            data: await (new EmployeeTransformer().transform(employee))
        });
    }

    static async showByEmail(req: Request, res: Response) {
        const email = req.body.email;
        const employee = await employeeService.showByEmail(email);

        if (!employee) {
            throw new EmployeeNotFoundException();
        }

        return res.json({
            data: await (new EmployeeTransformer().transform(employee))
        });
    }

    static async sendTeacherInvite(req: Request, res: Response) {
        const inputData = req.body as EmployeeInviteDto;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nodemailer20200202@gmail.com",
                pass: "Nodemailer@20200202"
            }
        });
        for (const email of inputData.emails) {
            const code = Helpers.generateRandomString(15, {
                includeUpperCase: true,
                includeLowerCase: true,
                includeNumbers: true,
                includeSpecialCharacters: false
            });
            const mailOptions = {
                from: "ERP KRP",
                to: email,
                subject: "Hop Into The Digital World",
                text: code
            };
            const employee = await employeeService.create({emp_id: code, email: email, type: EmployeeType.TEACHER});
            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
            const invite = await employeeInviteService.create({employee_id: employee.id, code: code});
        }
        return res.json({
            success: true
        });
    }

    static async sendClericalStaffInvite(req: Request, res: Response) {
        const inputData = req.body as EmployeeInviteDto;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nodemailer20200202@gmail.com",
                pass: "Nodemailer@20200202"
            }
        });
        for (const email of inputData.emails) {
            const code = Helpers.generateRandomString(15, {
                includeUpperCase: true,
                includeLowerCase: true,
                includeNumbers: true,
                includeSpecialCharacters: false
            });
            const mailOptions = {
                from: "ERP KRP",
                to: email,
                subject: "Hop Into The Digital World",
                text: code
            };
            const employee = await employeeService.create({
                emp_id: code,
                email: email,
                type: EmployeeType.CLERICAL_STAFF
            });
            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
            const invite = await employeeInviteService.create({employee_id: employee.id, code: code});
        }
        return res.json({
            success: true
        });
    }

    static async sendAdminInvite(req: Request, res: Response) {
        const inputData = req.body as EmployeeInviteDto;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nodemailer20200202@gmail.com",
                pass: "Nodemailer@20200202"
            }
        });
        for (const email of inputData.emails) {
            const code = Helpers.generateRandomString(15, {
                includeUpperCase: true,
                includeLowerCase: true,
                includeNumbers: true,
                includeSpecialCharacters: false
            });
            const mailOptions = {
                from: "ERP KRP",
                to: email,
                subject: "Hop Into The Digital World",
                text: code
            };
            const employee = await employeeService.create({emp_id: code, email: email, type: EmployeeType.ADMIN});
            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
            const invite = await employeeInviteService.create({employee_id: employee.id, code: code});
        }
        return res.json({
            success: true
        });
    }

    static async signUp(req: Request, res: Response) {
        const inputData = req.body as EmployeeCreateDto;
        const invite = await employeeInviteService.showByCode(inputData.code);
        if (!invite) {
            throw new InvitationNotFoundException();
        }
        const checkEmployee = await employeeService.showById(invite.employee_id);
        if (checkEmployee && checkEmployee.status !== EmployeeStatus.INVITED) {
            throw new EmployeeAlreadyRegisteredException();
        }
        const employee = await employeeService.update(checkEmployee, inputData);
        return res.json({
            data: await (new EmployeeTransformer().transform(employee))
        });
    }

    static async login(req: Request, res: Response) {
        const inputData = req.body as EmployeeLoginDto;
        const employee = await employeeService.showByEmail(inputData.email);
        if (!employee) {
            throw new EmployeeNotFoundException();
        }
        if (employee.status === EmployeeStatus.INVITED) {
            throw new EmployeeNotFoundException();
        }
        if (employee.status === EmployeeStatus.DEACTIVATED) {
            throw new EmployeeDeactivatedException();
        }
        const isPasswordCorrect = bcrypt.compareSync(inputData.password, employee.password);
        if (!isPasswordCorrect) {
            throw new WrongPasswordException();
        }
        return res.json({
            token: JsonWebToken.sign({
                data: employee.id
            }, ENV_JWT_SECRET, {expiresIn: "30d"}),
            employee: await (new EmployeeTransformer().transform(employee))
        });
    }
}
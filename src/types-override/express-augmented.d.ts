import { Employee } from "../models/employee.model";

declare module "express" {
    export interface Request {
    employee: Employee;
  }
}

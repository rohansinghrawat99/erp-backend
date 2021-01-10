import { NextFunction, Request, Response } from "express";
import { EmployeeType } from "../util/enum.util";
import { UnauthorizedException } from "../exceptions/root/unauthorized.exception";
import { ApiErrorCode } from "../exceptions/root/http.exception";

export const teacherMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const employee = req.employee;
  if (employee.type !== EmployeeType.TEACHER) {
      throw new UnauthorizedException("You are not authorized to perform this task", ApiErrorCode.NO_ACCESS_ERROR);
  }
  next();
};
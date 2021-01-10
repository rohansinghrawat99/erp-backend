import * as jsonwebtoken from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
import { ENV_JWT_SECRET } from "../util/secrets.util";
import { InvalidJwtTokenException } from "../exceptions/invalid-jwt-token.exception";
import { EmployeeNotFoundException } from "../exceptions/employee/employee-not-found.exception";
import { InternalException } from "../exceptions/root/internal.exception";
import { NextFunction, Request, Response } from "express";
import { Helpers } from "../util/helpers.util";
import { ApiErrorCode } from "../exceptions/root/http.exception";
import { employeeService } from "../services/entities/employee.service";

export const employeeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.headers.authorization;

  try {
    const payload = jsonwebtoken.decode(jwtToken, {json: true});

    if (!(jsonwebtoken.verify(jwtToken, ENV_JWT_SECRET))) {
      return Helpers.handleError(res, new InvalidJwtTokenException());
    }

    const userId = payload.data;
    const employee   = await employeeService.showById(userId);

    if (!employee) {
      return Helpers.handleError(res, new EmployeeNotFoundException());
    }
    req.employee = employee;
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      return Helpers.handleError(res, new InvalidJwtTokenException());
    } else {
      return Helpers.handleError(res, new InternalException(e.message, ApiErrorCode.UNKNOWN, e.stack));
    }
  }

  next();
};
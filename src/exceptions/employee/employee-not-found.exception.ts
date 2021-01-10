import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class EmployeeNotFoundException extends ModelNotFoundException {

  constructor() {
    super("Employee Not Found!", ApiErrorCode.EMPLOYEE_NOT_FOUND);
  }
}
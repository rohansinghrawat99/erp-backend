import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class EmployeeDeactivatedException extends ModelNotFoundException {

  constructor() {
    super("Employee Has Been Deactivated!", ApiErrorCode.EMPLOYEE_DEACTIVATED);
  }
}
import { ApiErrorCode } from "../root/http.exception";
import { ModelAlreadyExistsException } from "../root/model-already-exists.exception";

export class EmployeeAlreadyRegisteredException extends ModelAlreadyExistsException {

  constructor() {
    super("Employee Already Registered!", ApiErrorCode.EMPLOYEE_ALREADY_REGISTERED);
  }
}
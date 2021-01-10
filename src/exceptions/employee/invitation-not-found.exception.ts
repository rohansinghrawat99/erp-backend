import { ApiErrorCode } from "../root/http.exception";
import { ModelNotFoundException } from "../root/model-not-found.exception";

export class InvitationNotFoundException extends ModelNotFoundException {

  constructor() {
    super("Invitation Not Found!", ApiErrorCode.INVITATION_NOT_FOUND);
  }
}
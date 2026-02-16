// Todo: Study if this file should be here on utils or be in a more specific folder

import { statusMessages } from "../services/constants/http-status-message.js";

export class ResponseAdapter {
  static format(message, statusCode) {
    const response = {
      status: statusCode,
      message: message,
      timestamp: new Date().toISOString(),
    };

    if (statusCode >= 500) {
      response.message = message || statusMessages.SERVER_ERROR;
      response.error = true;
      return response;
    }

    if (statusCode >= 400) {
      response.error = true;
      return response;
    }

    response.error = false;
    return response;
  }
}

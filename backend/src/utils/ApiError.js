class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static setBadRequest(message) {
    return new ApiError(400, message);
  }

  static setUnauthorized(message) {
    return new ApiError(401, message);
  }

  static setForbidden(message) {
    return new ApiError(403, message);
  }

  static setNotFound(message) {
    return new ApiError(404, message);
  }

  static setInternalServerError(message) {
    return new ApiError(500, message);
  }
}

export default ApiError;

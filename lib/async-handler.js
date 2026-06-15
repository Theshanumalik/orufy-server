export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export class ApiError extends Error {
  constructor(statusCode, success, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
  }
}

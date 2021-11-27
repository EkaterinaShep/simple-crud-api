/* ------------------------------- Main Error ------------------------------- */
// CustomError
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

/* --------------------------------- Errors --------------------------------- */
// InvalidJSONError
class InvalidJSONError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 400;
  }
}

// InvalidIDError
class InvalidIDError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 400;
  }
}

// MissingPropertyError
class MissingPropertyError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 400;
  }
}

// InvalidPropertyError
class InvalidPropertyError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 400;
  }
}

// AbsentIDError
class AbsentIDError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 404;
  }
}

export {
  CustomError,
  InvalidJSONError,
  MissingPropertyError,
  AbsentIDError,
  InvalidIDError,
  InvalidPropertyError,
};

const AppError = require("../Utils/appError");

const handleJWTExpiredError = (orignalError, err) =>
  new AppError("Your token expired. Please log in again!", 401);

const handleJWTError = (orignalError, err) =>
  new AppError("Invlaid token. Please log in again!", 401);

const handleCastErrorDB = (orignalError, err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (orignalError, err) => {
  const value = orignalError.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate Field value : ${value}`;
  return new AppError(message, 400);
};

const handleValidationError = (orignalError, err) => {
  const errors = Object.values(orignalError.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let customError = { ...err };

    if (err.name === "CastError")
      customError = handleCastErrorDB(err, customError);
    if (err.code === 11000)
      customError = handleDuplicateFieldsDB(err, customError);
    if (err.name === "ValidationError")
      customError = handleValidationError(err, customError);
    if (err.name === "JsonWebTokenError")
      customError = handleJWTError(err, customError);
    if (err.name === "TokenExpiredError")
      customError = handleJWTExpiredError(err, customError);
    sendErrorProd(customError, res);
  }
};

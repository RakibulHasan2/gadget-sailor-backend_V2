
import { ErrorRequestHandler } from "express";
import { IGlobalGenericError } from "../../interfaceError/errorInterface";
import handleValidationError from "../../errors/handleValidationError";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import handleCastError from "../../errors/handleCastError";
import ApiError from "../../errors/ApiErrors";
import config from "../../config";


const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {

  let statusCode = 500;
  let message = 'something went wrong';
  let errorMessages: IGlobalGenericError[] = [];

  if (error?.name === 'ValidatorError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    errorMessages = error?.message
      ? [
        {
          path: '',
          message: error?.message,
        },
      ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
        {
          path: '',
          message: error?.message,
        },
      ]
      : [];
  }

  const propertyToExtract: any = (property: string) => {
    const { [property]: extractedValue } = error.keyValue
    return extractedValue
  }
  const errorM = propertyToExtract(Object.keys(error.keyValue))
  const keys = Object.keys(error.keyValue)

  res.status(statusCode).json({
    success: false,
    message: `${keys} '${errorM}' is already used`,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
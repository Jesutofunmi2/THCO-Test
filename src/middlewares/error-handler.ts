import { Request, Response } from "express";

const { errorResponse } = require("../utils/responseHandler");

export const unknownEndpoint = (req: Request, res: Response, next) => {
  res.status(404).send({ error: "Route not found" });
};

export const errorHandler = (error, request: Request, response: Response, next) => {
  if (error.name === "CastError") {
    return errorResponse(response, 400, "malformatted id");
  } else if (error.name === "ValidationError") {
    return errorResponse(response, 400, error.message);
  } else if (error.name === "JsonWebTokenError") {
    return errorResponse(response, 401, "Invalid token");
  } else if (error.name === "TokenExpiredError") {
    return errorResponse(response, 401, "Token expired");
  } else if (error.name === "TypeError") {
    return errorResponse(response, 400, "Invalid Request");
  }
  return next(error);
};

export const defaultErrorHandler = (error, req: Request, res: Response) => {
  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message,
  });
};



import { validationResult, matchedData } from "express-validator";
import AppError from "../errors/appError.js";

const validResult = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
    // throw new AppError('Validation Errors', 400, errors.errors);
  }
  req.bodyData = matchedData(req, { locations: ['body'] });
  req.paramsData = matchedData(req, { locations: ['params'] });
  req.queryData = matchedData(req, { locations: ['query'] });
  next();
};

export default validResult


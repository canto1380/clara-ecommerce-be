import { check } from "express-validator";
import validResult from "./commons.js";
import { validJWT } from "./authToken.js";
import AppError from "../errors/appError.js";

import { verifyIdDiscountExist } from "../controllers/discount.controller.js";

const fieldRequired = check(['descriptionDiscont', 'discountPercentage'], 'Fields required').not().isEmpty()
const validNumber = check('discountPercentage', 'Invalid number format').isNumeric()

const verifyDiscountExists = check('id').custom(async(id) => {
  const discountFound = await verifyIdDiscountExist(id)
  if(!discountFound) {
    throw new AppError('The id doesnt exists in DB', 400)
  }
})


export const postRequestValidations = [
  validJWT,
  fieldRequired,
  validNumber,
  validResult,
];
export const getRequestValidations = [validJWT, validResult];
export const getByIdRequestValidations = [
  validJWT,
  verifyDiscountExists,
  validResult,
];
export const patchRequestValidations = [
  validJWT,
  fieldRequired,
  validNumber,
  verifyDiscountExists,
  validResult,
];
export const deleteRequestValidations = [
  validJWT,
  verifyDiscountExists,
  validResult,
];
export const restoreRequestValidations = [
  validJWT,
  verifyDiscountExists,
  validResult,
];

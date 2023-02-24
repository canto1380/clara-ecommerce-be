import { check } from "express-validator";
import validResult from "./commons.js";
import { validJWT } from "./authToken.js";
import AppError from "../errors/appError.js";

import { verifyIdExistsBranch } from "../controllers/branch.controller.js";

const fieldRequired = check(["nameBranch", "idAddress"], "Field required")
  .not()
  .isEmpty();
const validNumber = check("phone", "Invalid number format").isNumeric();

const lenghtPhone = check(
  "phone",
  "Phone must be between 10 and 12 char"
).isLength({ min: 10, max: 12 });

const verifyBranchExists = check('id').custom(async(id) => {
  const branchFound = await verifyIdExistsBranch(id)
  if(!branchFound) {
    throw new AppError('The Id doesnt exists in DB', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  fieldRequired,
  validNumber,
  lenghtPhone,
  validResult,
];
export const getRequestValidations = [validJWT, validResult];
export const getByIdRequestValidations = [
  validJWT,
  verifyBranchExists,
  validResult,
];
export const patchRequestValidations = [
  validJWT,
  fieldRequired,
  validNumber,
  lenghtPhone,
  verifyBranchExists,
  validResult,
];
export const deleteRequestValidations = [
  validJWT,
  verifyBranchExists,
  validResult,
];
export const restoreRequestValidations = [
  validJWT,
  verifyBranchExists,
  validResult,
];

import { check } from "express-validator";
import validResult from "./commons.js";
import { validJWT } from "./authToken.js";
import AppError from "../errors/appError.js";
import { verifyExistsDataSheet } from "../controllers/dataSheet.controller.js";
import { verifyIdExistsFootwear } from "../controllers/footwear.controller.js";

const fieldRequired =check('idFootwear','Fields required').not().isEmpty()

const verifyIdDataSheetExist = check('id').custom(async(id) => {
  const dataSheetFound = await verifyExistsDataSheet(id)
  if(!dataSheetFound) {
    throw new AppError('The Id doesnt exists in DB', 400)
  }
})

const verifyIdFootwearExists = check('idFootwear').custom(async(idFootwear) => {
  const idFootwearFound = await verifyIdExistsFootwear(idFootwear)
  if(idFootwearFound === null) {
    throw new AppError('The id footwear doesnt exists in DB', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  fieldRequired,
  verifyIdFootwearExists,
  validResult,
];
export const getRequestValidations = [validJWT, validResult];
export const getByIdRequestValidations = [
  validJWT,
  verifyIdDataSheetExist,
  validResult,
];
export const patchRequestValidations = [
  validJWT,
  fieldRequired,
  verifyIdFootwearExists,
  validResult,
];
export const deleteRequestValidations = [
  validJWT,
  verifyIdDataSheetExist,
  validResult,
];
export const restoreRequestValidations = [
  validJWT,
  verifyIdDataSheetExist,
  validResult,
];

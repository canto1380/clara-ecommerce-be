import { check } from "express-validator";
import validResult from "./commons.js";

import { validJWT } from "./authToken.js";
import AppError from "../errors/appError.js";
import { verifyIdExistsFootwearType, verifyNameExistsFootwearType } from "../controllers/footwearType.controller.js";

const nameRequired = check('nameType', 'Name required').not().isEmpty()

const nameFootwearTypeNotRepeat = check('nameType').custom(async(nameType) =>{
  if(!nameType) {
    return
  }
  const footwearTypeFound = await verifyNameExistsFootwearType(nameType)
  if(footwearTypeFound !== null) {
    throw new AppError('The name already exists in DB', 400)
  }
})

const idFootwearTypeExists = check('id').custom(async(id) => {
  const footwearTypeFound = await verifyIdExistsFootwearType(id)
  if(!footwearTypeFound) {
    throw new AppError('The id doesnt exists in DB', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  nameRequired,
  nameFootwearTypeNotRepeat,
  validResult
]
export const getRequestValidations = [
  validJWT,
  validResult
]
export const getByIdRequestValidations = [
  validJWT,
  idFootwearTypeExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idFootwearTypeExists,
  nameFootwearTypeNotRepeat,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idFootwearTypeExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idFootwearTypeExists,
  validResult
]

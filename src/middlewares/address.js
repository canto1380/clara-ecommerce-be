import { check } from "express-validator";
import validResult from "./commons.js";

import { validJWT } from "./authToken.js";
import AppError from "../errors/appError.js";
import { verifyIdExist } from "../controllers/user.controller.js";
import { verifyIdExistLocation } from "../controllers/location.controller.js";
import { verifyIdAddressExists } from "../controllers/address.controller.js";

const fieldsRequired = check(
  ["as", "nameAddress", "number", "idUser", "idLocation"],
  "field required"
)
  .not()
  .isEmpty();

const validNumber = check('number', 'Invalid Number format').isNumeric()
const lenghtAs = check('as', 'As must be between 3 and 20 char').isLength({min: 3, max: 20})
const lenghtNameAddress = check('nameAddress', 'Name Address must be between 3 and 60 char').isLength({min: 3, max: 60})

const verifyIdAddressExist = check('id').custom(async(id) => {
  const addressFound = await verifyIdAddressExists(id)
  if(!addressFound) {
    throw new AppError('The id doesnt exists in DB', 400)
  }
})

const verifyIdUserExist = check('idUser').custom(async(idUser) => {
  const idUserFound = await verifyIdExist(idUser)
  if(idUserFound === null) {
    throw new AppError('The id User doesnt exists in DB', 400)
  }
})

const verifyIdLocatioExist = check('idLocation').custom(async(idLocation) => {
  const idLocationFound = await verifyIdExistLocation(idLocation)
  if(idLocationFound === null) {
    throw new AppError('Id location doesnt exists in DB', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  fieldsRequired,
  validNumber,
  lenghtAs,
  lenghtNameAddress,
  verifyIdUserExist,
  verifyIdLocatioExist,
  validResult
]
export const getRequestValidations = [
  validJWT,
  validResult
]
export const getByIdRequestValidations = [
  validJWT,
  verifyIdAddressExist,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  verifyIdAddressExist,
  fieldsRequired,
  validNumber,
  lenghtAs,
  lenghtNameAddress,
  verifyIdUserExist,
  verifyIdLocatioExist,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  verifyIdAddressExist,
  validResult
]


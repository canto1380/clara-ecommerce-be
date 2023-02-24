import {check} from 'express-validator'
import validResult from './commons.js'

import { validJWT } from './authToken.js'
import { verifyIdExistLocation, verifyNameExistLocation } from '../controllers/location.controller.js'
import { verifyIdExistProvince } from '../controllers/province.controller.js'
import AppError from '../errors/appError.js'

const nameRequired = check('nameLocation', 'Name required').not().isEmpty()

const idLocationExists = check('id').custom(async(id) =>{
  const locationFound = await verifyIdExistLocation(id)
  if(!locationFound ) {
    throw new AppError('The id doesnt exists in DB', 400)
  }
})

const nameLocationNotRepeat = check('nameLocation').custom(async(nameLocation) => {
  const locationFound = await verifyNameExistLocation(nameLocation)
  if(locationFound !== null)
  throw new AppError('The name already exists in DB')
})

const verifyIdProvinceExist = check('idProvince').custom(async(idProvince) => {
  const idProvinceFound = await verifyIdExistProvince(idProvince)
  if(idProvinceFound === null) {
    throw new AppError('The id Location doesnt exists in DB', 400)
  }
})


export const postRequestValidations = [
  validJWT,
  nameRequired,
  nameLocationNotRepeat,
  verifyIdProvinceExist,
  validResult
]
export const getRequestValidations = [
  validJWT,
  validResult
]
export const getByIdRequestValidations = [
  validJWT,
  idLocationExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idLocationExists,
  nameLocationNotRepeat,
  verifyIdProvinceExist,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idLocationExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idLocationExists,
  validResult
]

import {check} from 'express-validator'
import validResult from './commons.js'

import { validJWT } from './authToken.js'
import { verifyIdExistProvince, verifyNameExistProvince } from '../controllers/province.controller.js'
import { verifyIdExist } from '../controllers/country.controller.js'
import AppError from '../errors/appError.js'

const nameRequired = check('nameProvince', 'Name required').not().isEmpty()

const idProvinceExists = check('id').custom(async(id) =>{
  const provinceFound = await verifyIdExistProvince(id)
  if(!provinceFound ) {
    throw new AppError('The id doesnt exists in DB', 400)
  }
})

const nameProvinceNotRepeat = check('nameProvince').custom(async(nameProvince) => {
  const provinceFound = await verifyNameExistProvince(nameProvince)
  if(provinceFound !== null)
  throw new AppError('The name already exists in DB')
})

const verifyIdCountryExist = check('idCountry').custom(async(idCountry) => {
  const idCountryFound = await verifyIdExist(idCountry)
  if(idCountryFound === null) {
    throw new AppError('The id Country doesnt exists in DB', 400)
  }
})


export const postRequestValidations = [
  validJWT,
  nameRequired,
  nameProvinceNotRepeat,
  verifyIdCountryExist,
  validResult
]
export const getRequestValidations = [
  validJWT,
  validResult
]
export const getByIdRequestValidations = [
  validJWT,
  idProvinceExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idProvinceExists,
  nameProvinceNotRepeat,
  verifyIdCountryExist,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idProvinceExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idProvinceExists,
  validResult
]

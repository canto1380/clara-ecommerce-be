import {check} from 'express-validator'
import validResult from './commons.js'

import { validJWT } from './authToken.js'
import { verifyIdExist, verifyNameExist } from '../controllers/country.controller.js'
import AppError from '../errors/appError.js'

const nameRequired = check('nameCountry', 'Name required').not().isEmpty()

export const idExists = check('id').custom(async(id) =>{
  const countryFound = await verifyIdExist(id)
  if(!countryFound ) {
    throw new AppError('The id doesnt exists in DB', 400)
  }
})

const nameCountryNotRepeat = check('nameCountry').custom(async(nameCountry) => {
  const countryFound = await verifyNameExist(nameCountry)
  if(countryFound !== null)
  throw new AppError('The name already exists in DB')
})

export const postRequestValidations = [
  validJWT,
  nameRequired,
  nameCountryNotRepeat,
  validResult
]
export const getRequestValidations = [
  validJWT,
  validResult
]
export const getByIdRequestValidations = [
  validJWT,
  idExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idExists,
  nameCountryNotRepeat,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idExists,
  validResult
]

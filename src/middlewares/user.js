import {check} from 'express-validator'
import AppError from '../errors/appError.js'
import { verifyExists, verifyIdExist } from '../controllers/user.controller.js'
import validResult from './commons.js'
import { validJWT } from './authToken.js'

const idDisable = check('_id', 'Non modifiable Id').isEmpty();
const dataRequired = check(['email', 'name', 'surname', 'password'], 'Fields required').not().isEmpty();
const validEmail = check('email', 'Invalid email format').isEmail()
const lengthEmail = check('email', 'Email must be between 13 and 60 char.').isLength({min: 13, max: 60})
const lengthPass = check('password', 'Password must be between 8 and 16 char.').isLength({min:8, max:16})
const lengthName = check('name', 'Name must be between 3 and 30 char.').isLength({min: 3, max: 30})
const lengthSurname = check('surname', 'Surname must be between 3 and 30 char.').isLength({min:3, max:30})


const existeEmail = check('email').custom(async (email) => {
  const userFound = await verifyExists(email)
  if(userFound ) {
    throw new AppError("Email already exist in DB", 400)
  }
})
const lenghtId = check('id', 'Id must be 24 characters').isLength({min: 24, max: 24})
const IdExist = check('id').custom(async(id) => {
  const userFound = await verifyIdExist(id)
  if(!userFound || userFound.deleted) {
    throw new AppError('The id doesnt exists in DB', 400)
  }
})


export const postRequestValidations = [
  dataRequired,
  validEmail,
  lengthEmail,
  lengthPass,
  lengthName,
  lengthSurname,
  existeEmail,
  validResult
]
export const getByIdRequestValidations = [
  validJWT,
  lenghtId,
  IdExist,
  validResult
]
export const getAllRequestValidations = [
  validJWT,
  validResult
]
export const putRequestValidations = [
  validJWT,
  IdExist,
  existeEmail,
  lengthName,
  lengthSurname,
  idDisable,
  validResult
]
export const putPassRequestValidations = [
  validJWT,
  IdExist,
  lengthPass,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  IdExist,
  validResult
]
export const restoreRequestValidation = [
  validJWT,
  validResult
]

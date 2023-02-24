import { check } from "express-validator";
import validResult from "./commons.js";
import { validJWT } from "./authToken.js";
import AppError from "../errors/appError.js";

import {
  verifyIdExistsFootwear,
  verifyNameExistsFootwear,
  verifyItemCode,
} from "../controllers/footwear.controller.js";
import { verifyIdExistsFootwearType } from "../controllers/footwearType.controller.js";

const fieldRequired = check(
  [
    "nameFootwear",
    "description",
    "idFootwearType",
    "itemCode",
    "priceOriginal",
    "stock",
  ],
  "Field required"
)
  .not()
  .isEmpty();
const validNumber = check(
  ["discount", "price", "stock"],
  "Invalid number format"
).isNumeric();

const lenghtDesccription = check(
  "description",
  "Desccription must be between 10 and 100 char"
).isLength({ min: 10, max: 100 });
const lenghtItemCode = check(
  "itemCode",
  "ItemCode must be between 10 and 15 char"
).isLength({ min: 10, max: 15 });

const verifyIdFootwearExists = check("id").custom(async (id) => {
  const footwearFound = await verifyIdExistsFootwear(id);
  if (!footwearFound) {
    throw new AppError("The Id doesnt exists in DB", 400);
  }
});
const nameFootwearNotRepeat = check("nameFootwear").custom(
  async (nameFootwear) => {
    const footwearFound = await verifyNameExistsFootwear(nameFootwear);
    if (footwearFound !== null) {
      throw new AppError("The name already exists in DB", 400);
    }
  }
);

const verifyIdFootwearTypeExist = check("idFootwearType").custom(
  async (idFootwearType) => {
    const idFootwearTypeFound = await verifyIdExistsFootwearType(
      idFootwearType
    );
    if (idFootwearTypeFound === null) {
      throw new AppError("Id Footwear Type doesnt exist in DB", 400);
    }
  }
);

const verifyitemCodeNotRepeat = check("itemCode").custom(async (itemCode) => {
  const itemCodeFound = await verifyItemCode(itemCode);
  if (itemCodeFound !== null) {
    throw new AppError("The code already in DB", 400);
  }
});

export const postRequestValidations = [
  validJWT,
  fieldRequired,
  lenghtDesccription,
  lenghtItemCode,
  nameFootwearNotRepeat,
  verifyIdFootwearTypeExist,
  verifyitemCodeNotRepeat,
  validResult,
];
export const getRequestValidations = [validJWT, validResult];
export const getByIdRequestValidations = [
  validJWT,
  verifyIdFootwearExists,
  validResult,
];
export const patchRequestValidations = [
  validJWT,
  fieldRequired,
  lenghtDesccription,
  lenghtItemCode,
  verifyIdFootwearExists,
  nameFootwearNotRepeat,
  verifyitemCodeNotRepeat,
  verifyIdFootwearTypeExist,
  validResult,
];
export const deleteRequestValidations = [
  validJWT,
  verifyIdFootwearExists,
  validResult,
];
export const restoreRequestValidations = [
  validJWT,
  verifyIdFootwearExists,
  validResult,
];

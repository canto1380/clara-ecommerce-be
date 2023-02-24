import { Router } from "express";
import {
  allCountry,
  countryById,
  countryNotDeleted,
  createCountry,
  deleteCountry,
  restoreCountry,
  updateCountry,
} from "../controllers/country.controller.js";
import {
  getRequestValidations,
  postRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from "../middlewares/country.js";

const router = Router();

router.post("/", postRequestValidations, createCountry);
router.get("/", getRequestValidations, allCountry);
router.get("/countriesNotDeleted", getRequestValidations, countryNotDeleted);
router.get("/:id", getByIdRequestValidations, countryById);
router.patch("/:id", patchRequestValidations, updateCountry);
router.patch("/deleteCountry/:id", deleteRequestValidations, deleteCountry);
router.patch("/restoreCountry/:id", restoreRequestValidations, restoreCountry);

export default router;

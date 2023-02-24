import { Router } from "express";
import {
  allLocation,
  createLocation,
  deleteLocation,
  locationById,
  locationNotDeleted,
  restoreLocation,
  updateLocation,
} from "../controllers/location.controller.js";
import {
  postRequestValidations,
  getRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations,
} from "../middlewares/location.js";

const router = Router();

router.post("/",postRequestValidations, createLocation);
router.get("/",getRequestValidations, allLocation);
router.get("/locationNotDeleted", getRequestValidations, locationNotDeleted);
router.get("/:id", getByIdRequestValidations, locationById);
router.patch("/:id", patchRequestValidations, updateLocation);
router.patch("/deleteLocation/:id", deleteRequestValidations, deleteLocation);
router.patch("/restoreLocation/:id", restoreRequestValidations, restoreLocation);

export default router;

import { Router } from "express";
import {
  addressById,
  allAddress,
  createAddress,
  deleteAddress,
  updateAddress,
} from "../controllers/address.controller.js";
import {
  postRequestValidations,
  getRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
} from "../middlewares/address.js";

const router = Router();

router.post("/", postRequestValidations, createAddress);
router.get("/", getRequestValidations, allAddress);
router.get("/:id", getByIdRequestValidations, addressById);
router.patch("/:id", patchRequestValidations, updateAddress);
router.delete("/:id", deleteRequestValidations, deleteAddress);

export default router;

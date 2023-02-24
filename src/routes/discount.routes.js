import { Router } from "express";
import {
  createDiscount,
  deleteDiscount,
  getAllDiscount,
  getByIdDiscount,
  restoreDiscount,
  updateDiscount,
} from "../controllers/discount.controller.js";
import {
  deleteRequestValidations,
  getByIdRequestValidations,
  getRequestValidations,
  patchRequestValidations,
  postRequestValidations,
  restoreRequestValidations,
} from "../middlewares/discount.js";

const router = Router();

router.post("/", postRequestValidations, createDiscount);
router.get("/", getRequestValidations, getAllDiscount);
router.get("/:id", getByIdRequestValidations, getByIdDiscount);
router.patch("/:id", patchRequestValidations, updateDiscount);
router.patch("/deleteDiscount/:id", deleteRequestValidations, deleteDiscount);
router.patch(
  "/restoreDiscount/:id",
  restoreRequestValidations,
  restoreDiscount
);

export default router;

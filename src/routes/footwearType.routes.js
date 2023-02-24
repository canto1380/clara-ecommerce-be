import { Router } from "express";
import {
  allFootwearType,
  createFootwearType,
  deleteFootwearType,
  footwearTypeById,
  restoreFootwearType,
  updateFootwearType,
} from "../controllers/footwearType.controller.js";
import {
  getByIdRequestValidations,
  postRequestValidations,
  getRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations,
} from "../middlewares/footwearTpe.js";

const router = Router();

router.get("/", allFootwearType);
router.get("/:id", footwearTypeById);
router.post("/", postRequestValidations, createFootwearType);
router.patch("/:id", patchRequestValidations, updateFootwearType);
router.patch(
  "/deleteFootwearType/:id",
  deleteRequestValidations,
  deleteFootwearType
);
router.patch(
  "/restoreFootwearType/:id",
  restoreRequestValidations,
  restoreFootwearType
);

export default router;

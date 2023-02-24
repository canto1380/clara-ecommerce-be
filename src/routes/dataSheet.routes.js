import { Router } from "express";
import {
  createDataSheet,
  deleteDataSheet,
  getAllDataSheet,
  getByIdDataSheet,
  restoreDataSheet,
  updateDataSheet,
} from "../controllers/dataSheet.controller.js";

import {
  postRequestValidations,
  getRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations,
} from "../middlewares/dataSheet.js";

const router = Router();

router.post("/", postRequestValidations, createDataSheet);
router.get("/", getRequestValidations, getAllDataSheet);
router.get("/:id", getByIdRequestValidations, getByIdDataSheet);
router.patch("/:id", patchRequestValidations, updateDataSheet);
router.patch("/deleteDatasheet/:id", deleteRequestValidations, deleteDataSheet);
router.patch(
  "/restoreDatasheet/:id",
  restoreRequestValidations,
  restoreDataSheet
);

export default router;

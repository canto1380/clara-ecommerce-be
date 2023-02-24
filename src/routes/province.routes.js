import { Router } from "express";
import {
  allProvinces,
  createProvince,
  deleteProvince,
  provinceById,
  ProvinceNotDeleted,
  restoreProvince,
  updateProvince,
} from "../controllers/province.controller.js";

import {
  postRequestValidations,
  getRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations,
} from "../middlewares/province.js";

const router = Router();

router.post("/", postRequestValidations, createProvince);
router.get("/", getRequestValidations, allProvinces);
router.get("/provincesNotDeleted", getRequestValidations, ProvinceNotDeleted);
router.get("/:id", getByIdRequestValidations, provinceById);
router.patch("/:id", patchRequestValidations, updateProvince);
router.patch("/deleteProvince/:id", deleteRequestValidations, deleteProvince);
router.patch("/restoreProvince/:id", restoreRequestValidations, restoreProvince);

export default router;

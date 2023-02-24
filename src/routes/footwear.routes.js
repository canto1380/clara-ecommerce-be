import { Router } from "express";
import {
  allFootwear,
  createFootwear,
  deleteFootwear,
  footwearById,
  footwearByType,
  footwearNews,
  restoreFootwear,
  updateFootwear,
  footwearByName
} from "../controllers/footwear.controller.js";
import { addStockBranch } from "../controllers/footwearBranch.controller.js";

import {
  postRequestValidations,
  getRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations,
} from "../middlewares/footwear.js";

const router = Router();

router.post("/addStock/:idFootwear", addStockBranch);

router.post("/", postRequestValidations, createFootwear);
router.get("/", allFootwear);
router.get('/footwearNew', footwearNews)
router.get("/productos/:nameType", footwearByType);
router.get("/producto/:nameFootwear", footwearByName);

router.get("/:id", getByIdRequestValidations, footwearById);
router.patch("/:id", updateFootwear);
router.patch("/deleteFootwear/:id", deleteRequestValidations, deleteFootwear);
router.patch(
  "/restoreFootwear/:id",
  restoreRequestValidations,
  restoreFootwear
);

export default router;

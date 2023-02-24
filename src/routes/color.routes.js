import { Router } from "express";
import {
  allColorFootwear,
  colorById,
  createColor,
  deleteColorFootwear,
  restoreColorFootwear,
  updatecolorFootwear,
} from "../controllers/color.controller.js";

const router = Router();

router.post("/", createColor);
router.get("/", allColorFootwear);
router.get("/:id", colorById);
router.patch("/:id", updatecolorFootwear);
router.patch("/deleteFootwear/:id", deleteColorFootwear);
router.patch("/restoreFootwear/:id", restoreColorFootwear);

export default router;

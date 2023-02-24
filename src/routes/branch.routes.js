import { Router } from "express";
import {
  allBranch,
  branchById,
  createBranch,
  deleteBranch,
  restoreBranch,
  updateBranch,
} from "../controllers/branch.controller.js";
import {
  deleteRequestValidations,
  getByIdRequestValidations,
  getRequestValidations,
  patchRequestValidations,
  postRequestValidations,
  restoreRequestValidations,
} from "../middlewares/branch.js";

const router = Router();

router.post("/", postRequestValidations, createBranch);
router.get("", getRequestValidations, allBranch);
router.get("/:id", getByIdRequestValidations, branchById);
router.patch("/update/:id", patchRequestValidations, updateBranch);
router.patch("/deleteBranch/:id", deleteRequestValidations, deleteBranch);
router.patch("/retoreBranch/:id", restoreRequestValidations, restoreBranch);

export default router;

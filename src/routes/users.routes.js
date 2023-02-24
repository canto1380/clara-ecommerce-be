import { Router } from "express";
import {
  userList,
  createUser,
  userById,
  updateUser,
  deleteUser,
  restaurarUser,
  passwordUpdate,
  allUser,
  updatePass,
  userByNickname,
} from "../controllers/user.controller.js";
import {
  deleteRequestValidations,
  getByIdRequestValidations,
  postRequestValidations,
  putRequestValidations,
  restoreRequestValidation,
  putPassRequestValidations,
  getAllRequestValidations,
} from "../middlewares/user.js";
const router = Router();

router.get("/allUser", allUser);
router.get("/", getAllRequestValidations, userList);
router.post("/createUser", postRequestValidations, createUser);
router.get("/:id", getByIdRequestValidations, userById);
router.get('/nick/:nickname',userByNickname)
router.patch("/:id", putRequestValidations, updateUser);
router.patch("/updatePass/:id", putPassRequestValidations, updatePass);
router.put("/delete/:id", deleteRequestValidations, deleteUser);
router.put("/restore/:id", restoreRequestValidation, restaurarUser);

router.put("passwordUpdate", passwordUpdate);
export default router;

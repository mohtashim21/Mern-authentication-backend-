import { Router } from "express";
import {
  register,
  login,
  checkAuth,
  getAllUsers,
  logout,
  deleteAllUsers,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check", checkAuth);
router.get("/getallusers", getAllUsers);
router.post("/logout", logout);
router.delete("/deleteallusers", deleteAllUsers);

export default router;

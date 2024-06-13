import { Router } from "express";
import {
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
  deleteAllContact,
} from "../controllers/contact.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", authMiddleware, getAllContacts);
router.post("/", authMiddleware, addContact);
router.delete("/:id", authMiddleware, deleteContact);
router.delete("/", authMiddleware, deleteAllContact);
router.put("/:id", authMiddleware, updateContact);

export default router;

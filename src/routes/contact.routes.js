import { Router } from "express";
import {
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
  deleteAllContact,
} from "../controllers/contact.controller.js";


const router = Router();

router.get("/", getAllContacts);
router.post("/", addContact);
router.delete("/:id", deleteContact);
router.delete("/", deleteAllContact);
router.put("/:id", updateContact);

export default router;

import { Contact } from "../models/contact.model.js";
import mongoose from "mongoose";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.userId });
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addContact = async (req, res) => {
  try {
    const { name, contactNumber, email } = req.body;
    const contact = new Contact({ name, contactNumber, email, user: req.userId });
    await contact.save();
    res.status(201).json({ message: "Contact added", contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).send("Contact deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { name, contactNumber, email } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const existingContact = await Contact.findById(req.params.id);
    if (!existingContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, contactNumber, email },
      { new: true }
    );

    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact not found after update" });
    }

    res.status(200).json(contact);
    console.log(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAllContact = async (req, res) => {
  try {
    const userId = req.userId;
    const contacts = await Contact.find({ user: userId });

    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    await Contact.deleteMany({ user: userId });

    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

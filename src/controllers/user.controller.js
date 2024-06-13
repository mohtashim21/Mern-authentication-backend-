import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send("User already has an account with this username");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Error registering user");
    console.log(err);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).send("Server error");
    console.log(err);
  }
};

export const checkAuth = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).json({ message: "Authenticated" });
  } catch (error) {
    res.status(401).json({ message: "Not authenticated" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true });
  res.json({ message: "Logout successful" });
};

export const deleteAllUsers = async (req, res) => {
  try {
    const userId = req.userId;
    const users = await User.find({ user: userId });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    await User.deleteMany({ user: userId });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

import express from "express";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cookieParser());

const corsOptions = {
  origin: ['http://localhost:5173', 'https://mern-authentication-app.netlify.app'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth/user", userRoutes);
app.use("/api/contact", contactRoutes);

export { app };

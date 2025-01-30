import dotenv from "dotenv";
import express from "express";
import cors from "cors"; // ✅ Import CORS

import newUserCreation from "./routes/newusercreation.route.js";
import {connectDB}  from "./lib/db.js";
import { signup } from "./controllers/user.controller.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend requests

app.use(express.json());

// app.use("/new-user", newUserCreation);

app.post('/new-user', signup);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

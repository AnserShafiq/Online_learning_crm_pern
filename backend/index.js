import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import newUserCreation from "./routes/newusercreation.route.js";
import managersData from './routes/managers.route.js';
import agentsData from './routes/agents.route.js';
import {connectDB}  from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

connectDB()

app.use("/", newUserCreation);
app.use('/managers', managersData);
app.use('/agents', agentsData);

// app.post('/new-user', signup);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});

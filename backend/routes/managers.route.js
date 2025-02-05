import express from "express";
import { getList } from "../controllers/managers.controller.js";


const router = express.Router();

router.get('/list',getList);

export default router
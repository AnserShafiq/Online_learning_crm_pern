import express from "express";
import { getList,getCompanies } from "../controllers/managers.controller.js";


const router = express.Router();

router.get('/list',getList);
router.get('/companies',getCompanies);
export default router
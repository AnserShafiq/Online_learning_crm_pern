import express from "express";
import { getList, getCompaniesForManagers } from "../controllers/managers.controller.js";
import { getManagerOfUser } from "../controllers/user.controller.js";


const router = express.Router();
router.post('/details',getManagerOfUser);
router.get('/list',getList);
router.get('/companies',getCompaniesForManagers);
export default router
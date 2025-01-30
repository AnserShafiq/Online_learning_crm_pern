import express from 'express';
import { signup } from '../controllers/user.controller.js';


const router = express.Router();
router.post('/new-user',signup);
export default router;
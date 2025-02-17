import express from 'express'
import { getCompaniesForAgents, getTimeSpent, updateTimeSpent, addTestMarks } from '../controllers/agents.controller.js'

const router = express.Router()

router.get('/companies', getCompaniesForAgents);
router.post('/timespent', getTimeSpent);
router.post('/timeupdate', updateTimeSpent);
router.post('/addmarks', addTestMarks);
export default router
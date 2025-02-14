import express from 'express'
import { getCompaniesForAgents, getTimeSpent, updateTimeSpent } from '../controllers/agents.controller.js'

const router = express.Router()

router.get('/companies', getCompaniesForAgents);
router.post('/timespent', getTimeSpent);
router.post('/timeupdate', updateTimeSpent)
export default router
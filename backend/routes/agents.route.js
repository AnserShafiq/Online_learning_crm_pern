import express from 'express'
import { getCompaniesForAgents } from '../controllers/agents.controller.js'

const router = express.Router()

router.get('/companies', getCompaniesForAgents);

export default router
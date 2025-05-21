import express from 'express'
import loginAdministrativo from '../controllers/administrativoLogin.js'

const router = express.Router();

router.post('/', loginAdministrativo)

export default router
import express from 'express'
import loginAdministrativo from '../controllers/administrativoLogin.js'

const router = express.Router();

router.post('/loginadministrativo', loginAdministrativo)

export default router
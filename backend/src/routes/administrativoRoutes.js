import express from 'express';
import criarCadastroAdministrativo from '../controllers/administrativoControllers.js';

const router = express.Router();

router.post('/admninistrativo', criarCadastroAdministrativo)

export default router
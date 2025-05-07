// src/routes/alunosRoute.js
import express from 'express';
import criarCadastroEmpresas from '../controllers/empresasControllers.js'

const router = express.Router();

router.post('/empresas', criarCadastroEmpresas);

export default router;

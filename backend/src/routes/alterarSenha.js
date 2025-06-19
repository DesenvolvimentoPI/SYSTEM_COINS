import express from 'express';
import AlterarSenha from '../controllers/alterarSenha.js';

const router = express.Router();

router.put('/', AlterarSenha)

export default router
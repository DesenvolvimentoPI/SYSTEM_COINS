// src/routes/alunosRoute.js
import express from 'express';
import criarCadastroAlunos from '../controllers/alunosControllers.js'

const router = express.Router();

router.post('/alunos', criarCadastroAlunos);


export default router;

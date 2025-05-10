// src/routes/alunosRoute.js
import express from 'express';
import criarCadastroAlunos, {listarAlunos} from '../controllers/alunosControllers.js'
const router = express.Router();

router.post('/alunos', criarCadastroAlunos);
router.get('/alunos', listarAlunos)


export default router;

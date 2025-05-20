// src/routes/alunosRoute.js
import express from 'express';
import criarCadastroAlunos, {listarAlunos, deletarAluno, atualizarAluno} from '../controllers/alunosControllers.js'
const router = express.Router();

router.get('/', listarAlunos);
router.post('/', criarCadastroAlunos);
router.put('/:id', atualizarAluno);
router.delete('/:id', deletarAluno);



export default router;

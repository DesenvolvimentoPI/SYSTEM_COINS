import express from 'express';
import {
  cadastrarAlunoNoCurso,
  listarCursos,
  deletarMatricula
} from '../controllers/alunoCursoControllers.js';

const router = express.Router();


router.post('/', cadastrarAlunoNoCurso);

router.get('/:alunoId', listarCursos);

router.delete('/', deletarMatricula);

export default router;

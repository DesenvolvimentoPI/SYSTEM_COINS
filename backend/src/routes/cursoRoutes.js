import express from 'express';
import {
  getCursos,
  postCurso,
  putCurso,
  deleteCurso
} from '../controllers/cursoControllers.js';

const router = express.Router();

router.get('/', getCursos);
router.post('/', postCurso);
router.put('/:id', putCurso);
router.delete('/:id', deleteCurso);

export default router;

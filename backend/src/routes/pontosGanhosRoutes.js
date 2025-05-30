import express from 'express';
import {
  postPontosGanhos,
  getExtratoGanhos
} from '../controllers/pontosGanhosControllers.js';

const router = express.Router();

router.post('/', postPontosGanhos);
router.get('/:id', getExtratoGanhos);

export default router;

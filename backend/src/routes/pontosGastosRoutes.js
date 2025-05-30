import express from 'express';
import {
  postPontosGastos,
  getExtratoGastos
} from '../controllers/pontosGastosControllers.js';

const router = express.Router();

router.post('/', postPontosGastos);
router.get('/:id', getExtratoGastos);

export default router;

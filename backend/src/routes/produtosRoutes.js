import express from 'express';
import {
  getExtratoGastos,
  postPontosGastos,
  deleteProduto
} from '../controllers/produtosControllers.js';

const router = express.Router();

router.get('/', getExtratoGastos);
router.post('/', postPontosGastos);
router.delete('/:id', deleteProduto);

export default router;

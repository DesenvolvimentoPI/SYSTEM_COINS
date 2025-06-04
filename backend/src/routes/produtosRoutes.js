import express from 'express';
import {
  getProdutos,
  postProduto,
  deleteProduto
} from '../controllers/produtosControllers.js';

const router = express.Router();

router.get('/', getProdutos);
router.post('/', postProduto);
router.delete('/:id', deleteProduto);

export default router;

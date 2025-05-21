// src/routes/alunosRoute.js
import express from 'express';
import criarCadastroEmpresas, {allEmpresas, atualizarEmpresa, deletarEmpresa} from '../controllers/empresasControllers.js'

const router = express.Router();

router.post('/', criarCadastroEmpresas);
router.get('/', allEmpresas);
router.put('/:id', atualizarEmpresa);
router.delete('/:id', deletarEmpresa);


export default router;

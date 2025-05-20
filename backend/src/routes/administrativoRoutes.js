import express from 'express';
import criarCadastroAdministrativo, {atualizarAdministrativo, listarAdministrativo, deletarAdministrativo}from '../controllers/administrativoControllers.js';

const router = express.Router();

router.get('/', listarAdministrativo);
router.post('/', criarCadastroAdministrativo);
router.put('/:id', atualizarAdministrativo);
router.delete('/:id', deletarAdministrativo);

export default router
import express from 'express';
import BuscarEmailBusca from '../controllers/buscarEmail.js'

const router = express.Router();

router.post('/', BuscarEmailBusca)

export default router
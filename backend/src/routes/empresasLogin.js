import express from 'express';
import login from '../controllers/empresasLogin'

const router = express.Router();

router.post('/', loginEmpresa)

export default router
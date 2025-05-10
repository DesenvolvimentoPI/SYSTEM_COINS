import express from 'express';
import login from '../controllers/loginAlunos.js'

const router = express.Router();

router.post('/loginalunos', login)

export default router
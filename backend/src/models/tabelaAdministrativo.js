// src/models/tabelaAlunos.js
import { pool } from '../database/connection.js';

export async function listarAlunos() {
  try {
    const conexao = await pool.connect();
    const resultado = await conexao.request().query('SELECT * FROM administrativo');
    const resultadoAlunos = await conexao.request().query('select * from alunos');
    return resultado.recordset , resultadoAlunos.recordset;
  } catch (erro) {
    console.error('Erro ao buscar empresas:', erro);
    throw erro;
  }
}


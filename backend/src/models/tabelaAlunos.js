// src/models/tabelaAlunos.js
import { pool } from '../database/connection.js';

export async function listarAlunos() {
  try {
    const conexao = await pool.connect();
    const resultado = await conexao.request().query('SELECT * FROM alunos');
    const resultadoAdministrativo = await conexao.request().query('select * from administrativo');
    return resultado.recordset, resultadoAdministrativo.recordset;
  } catch (erro) {
    console.error('Erro ao buscar alunos:', erro);
    throw erro;
  }
}


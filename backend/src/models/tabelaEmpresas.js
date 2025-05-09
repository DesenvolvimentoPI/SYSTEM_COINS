import { pool } from '../database/connection.js';

export async function listarEmpresas() {
  try {
    const conexao = await pool.connect();
    const resultado = await conexao.request().query('SELECT * FROM empresas');
    return resultado.recordset;
  } catch (erro) {
    console.error('Erro ao buscar empresas:', erro);
    throw erro;
  }
}


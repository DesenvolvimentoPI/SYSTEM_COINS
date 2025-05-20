// testeConsulta.js
import { pool } from '../database/connection.js';

async function testarConsulta() {
  try {
    const conexao = await pool.connect();
    
    const resultado = await conexao
      .request()
      .query('SELECT * FROM administrativo');

    console.log('Dados retornados:');
    console.table(resultado.recordset);
  } catch (erro) {
    console.error('Erro ao consultar a tabela:', erro);
  }
}

testarConsulta();

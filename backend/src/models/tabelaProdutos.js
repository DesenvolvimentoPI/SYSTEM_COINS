import { pool } from '../database/connection.js';

// Listar todos os produtos
export async function listarProdutos() {
  try {
    const conexao = await pool.connect();
    const resultado = await conexao.request().query(`
      SELECT id, nome_produto, valor_pontos FROM produtos
    `);
    return resultado.recordset;
  } catch (erro) {
    console.error('Erro ao listar produtos:', erro);
    throw erro;
  }
}

// Cadastrar novo produto
export async function cadastrarProduto({ nome_produto, valor_pontos }) {
  try {
    const conexao = await pool.connect();
    await conexao.request()
      .input('nome_produto', nome_produto)
      .input('valor_pontos', valor_pontos)
      .query(`
        INSERT INTO produtos (nome_produto, valor_pontos)
        VALUES (@nome_produto, @valor_pontos)
      `);
  } catch (erro) {
    console.error('Erro ao cadastrar produto:', erro);
    throw erro;
  }
}

// Deletar produto por ID
export async function deletarProduto(id) {
  try {
    const conexao = await pool.connect();
    await conexao.request()
      .input('id', id)
      .query('DELETE FROM produtos WHERE id = @id');
  } catch (erro) {
    console.error('Erro ao deletar produto:', erro);
    throw erro;
  }
}

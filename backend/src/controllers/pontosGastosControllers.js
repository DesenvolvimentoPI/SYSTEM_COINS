import {
  registrarPontosGastos,
  listarPontosGastos
} from '../models/tabelaPontosGastos.js';
import { pool } from '../database/connection.js';

// POST /api/pontos-gastos
export async function postPontosGastos(req, res) {
  const { id_aluno, id_produto } = req.body;

  if (id_aluno === undefined || id_produto === undefined) {
    return res.status(400).json({ mensagem: 'id_aluno e id_produto são obrigatórios.' });
  }

  try {
    const conexao = await pool.connect();

    // Buscar o produto pelo ID
    const { recordset } = await conexao.request()
      .input('id_produto', id_produto)
      .query('SELECT nome_produto, valor_pontos FROM produtos WHERE id = @id_produto');

    const produto = recordset[0];

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    // Registrar gasto com os dados do produto
    await registrarPontosGastos(id_aluno, produto.valor_pontos, produto.nome_produto);

    res.status(201).json({
      mensagem: 'Produto resgatado com sucesso e pontos descontados.',
      produto: produto.nome_produto,
      pontos_gastos: produto.valor_pontos
    });

  } catch (erro) {
    if (erro.message === 'Produto não encontrado') {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
    if (erro.message === 'Saldo insuficiente') {
      return res.status(400).json({ mensagem: 'Saldo insuficiente para resgatar o produto.' });
    }
    res.status(500).json({ mensagem: 'Erro ao registrar pontos gastos.', erro: erro.message });
  }
}

// GET /api/pontos-gastos/:id_aluno
export async function getExtratoGastos(req, res) {
  const { id_aluno } = req.params;

  try {
    const extrato = await listarPontosGastos(id_aluno);
    res.status(200).json(extrato);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar pontos gastos.', erro: erro.message });
  }
}
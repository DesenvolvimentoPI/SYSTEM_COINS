import {
  registrarPontosGastos,
  listarPontosGastos
} from '../models/tabelaPontosGastos.js';

// POST /api/pontos-gastos
export async function postPontosGastos(req, res) {
  const { id_aluno, id_produto } = req.body;

  if (id_aluno === undefined || id_produto === undefined) {
    return res.status(400).json({ mensagem: 'id_aluno e id_produto são obrigatórios.' });
  }

  try {
    await registrarPontosGastos(id_aluno, id_produto);
    res.status(201).json({ mensagem: 'Produto resgatado com sucesso e pontos descontados.' });
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

export async function deleteProduto(req, res) {
  const { id } = req.params;

  try {
    await deletarProduto(id);
    res.status(200).json({ mensagem: 'Produto deletado com sucesso.' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao deletar produto.', erro: erro.message });
  }
}


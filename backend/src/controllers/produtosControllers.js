import {
  listarProdutos,
  cadastrarProduto,
  deletarProduto
} from '../models/tabelaProdutos.js';

// GET /api/produtos
export async function getProdutos(req, res) {
  try {
    const produtos = await listarProdutos();
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar produtos.', erro: erro.message });
  }
}

// POST /api/produtos
export async function postProduto(req, res) {
  const { nome_produto, valor_pontos } = req.body;

  if (!nome_produto || valor_pontos === undefined) {
    return res.status(400).json({ mensagem: 'nome_produto e valor_pontos são obrigatórios.' });
  }

  try {
    await cadastrarProduto({ nome_produto, valor_pontos });
    res.status(201).json({ mensagem: 'Produto cadastrado com sucesso.' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar produto.', erro: erro.message });
  }
}

// DELETE /api/produtos/:id
export async function deleteProduto(req, res) {
  const { id } = req.params;

  try {
    await deletarProduto(id);
    res.status(200).json({ mensagem: 'Produto deletado com sucesso.' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao deletar produto.', erro: erro.message });
  }
}
import {
    registrarPontosGastos,
    listarPontosGastos
  } from '../models/tabelaPontosGastos.js';
  
  // POST /api/pontos-gastos
  export async function postPontosGastos(req, res) {
    const { id_aluno, quantidade, produto } = req.body;
  
    if (!id_aluno || !quantidade || !produto) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }
  
    try {
      await registrarPontosGastos(id_aluno, quantidade, produto);
      res.status(201).json({ mensagem: 'Pontos gastos registrados com sucesso.' });
    } catch (erro) {
      if (erro.message === 'Saldo insuficiente') {
        return res.status(400).json({ mensagem: 'Saldo insuficiente para esta operação.' });
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
  
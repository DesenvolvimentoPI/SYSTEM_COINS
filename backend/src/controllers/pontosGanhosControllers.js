import {
  registrarPontosGanhos,
  listarPontosGanhos
} from '../models/tabelaPontosGanhos.js';

// Função de conversão de nota para pontos
function converterNotaParaPontos(nota) {
  if (nota >= 9) return 800;
  if (nota >= 8) return 600;
  if (nota >= 7) return 400;
  if (nota >= 6) return 200;
  if (nota >= 5) return 100;
  return 0;
}

// POST /api/pontos-ganhos
export async function postPontosGanhos(req, res) {
  const { id_aluno, nota, motivo } = req.body;

  if (id_aluno === undefined || nota === undefined || motivo === undefined) {
    return res.status(400).json({ mensagem: 'id_aluno, nota e motivo são obrigatórios.' });
  }

  const pontos = converterNotaParaPontos(nota);

  try {
    await registrarPontosGanhos(id_aluno, pontos, `${motivo} - Nota ${nota}`);
    res.status(201).json({
      mensagem: 'Pontos ganhos registrados com sucesso.',
      nota,
      pontos_atribuidos: pontos
    });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao registrar pontos ganhos.', erro: erro.message });
  }
}

// GET /api/pontos-ganhos/:id_aluno
export async function getExtratoGanhos(req, res) {
  const { id_aluno } = req.params;

  try {
    const extrato = await listarPontosGanhos(id_aluno);
    res.status(200).json(extrato);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar pontos ganhos.', erro: erro.message });
  }
}

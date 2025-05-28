import { 
  relacionarAlunoCurso, 
  listarCursosDoAluno, 
  removerMatricula 
} from '../models/tabelaAlunoCurso.js';

// POST - Matricular aluno em um curso
export const cadastrarAlunoNoCurso = async (req, res) => {
  try {
    const { alunoId, cursoId } = req.body;

    if (!alunoId || !cursoId) {
      return res.status(400).json({ erro: "alunoId e cursoId são obrigatórios" });
    }

    await relacionarAlunoCurso(alunoId, cursoId);
    res.status(201).json({ mensagem: "Aluno matriculado com sucesso no curso" });
    
  } catch (erro) {
    console.error("Erro ao cadastrar aluno no curso:", erro);
    res.status(500).json({ erro: "Erro ao matricular aluno", detalhes: erro.message });
  }
};

// GET - Listar cursos de um aluno
export const listarCursos = async (req, res) => {
  try {
    const alunoId = req.params.alunoId;

    if (!alunoId) {
      return res.status(400).json({ erro: "alunoId é obrigatório na URL" });
    }

    const cursos = await listarCursosDoAluno(alunoId);

    if (cursos.length === 0) {
      return res.status(404).json({ mensagem: 'Aluno não está matriculado em nenhum curso.' });
    }

    res.status(200).json(cursos);
    
  } catch (erro) {
    console.error("Erro ao buscar cursos do aluno:", erro);
    res.status(500).json({ erro: "Erro ao buscar cursos do aluno", detalhes: erro.message });
  }
};

// DELETE - Remover matrícula
export const deletarMatricula = async (req, res) => {
  try {
    const { alunoId, cursoId } = req.body;

    if (!alunoId || !cursoId) {
      return res.status(400).json({ erro: "alunoId e cursoId são obrigatórios" });
    }

    await removerMatricula(alunoId, cursoId);
    res.status(200).json({ mensagem: "Matrícula removida com sucesso." });

  } catch (erro) {
    console.error("Erro ao remover matrícula:", erro);
    res.status(500).json({ erro: "Erro ao remover matrícula", detalhes: erro.message });
  }
};

import { pool } from '../database/connection.js';

// Insere nova matrícula
export const relacionarAlunoCurso = async (alunoId, cursoId) => {
  const conexao = await pool.connect();
  await conexao.request()
    .input('alunoId', alunoId)
    .input('cursoId', cursoId)
    .query(`
      INSERT INTO alunos_curso (id_aluno, id_curso)
      VALUES (@alunoId, @cursoId)
    `);
};

// Lista cursos do aluno
export const listarCursosDoAluno = async (alunoId) => {
  const conexao = await pool.connect();
  const resultado = await conexao.request()
    .input('alunoId', alunoId)
    .query(`
      SELECT 
        ac.id AS id_matricula,
        c.id AS id_curso,
        c.nome_curso,
        c.quantidade_horas,
        ac.data_matricula
      FROM alunos_curso ac
      JOIN cursos c ON ac.id_curso = c.id
      WHERE ac.id_aluno = @alunoId
    `);
  return resultado.recordset;
};

// Remove matrícula
export const removerMatricula = async (alunoId, cursoId) => {
  const conexao = await pool.connect();
  await conexao.request()
    .input('alunoId', alunoId)
    .input('cursoId', cursoId)
    .query(`
      DELETE FROM alunos_curso
      WHERE id_aluno = @alunoId AND id_curso = @cursoId
    `);
};

import { pool } from '../database/connection.js';

// Listar todos os cursos
export async function listarCursos() {
  try {
    const conexao = await pool.connect();
    const resultado = await conexao.request().query('SELECT * FROM cursos');
    return resultado.recordset;
  } catch (erro) {
    console.error('Erro ao listar cursos:', erro);
    throw erro;
  }
}

// Criar um novo curso
export async function criarCurso({ nome, carga_horaria }) {
  try {
    const conexao = await pool.connect();
    await conexao.request()
      .input('nome', nome)
      .input('carga_horaria', carga_horaria)
      .query(`
        INSERT INTO cursos (nome, carga_horaria)
        VALUES (@nome, @carga_horaria)
      `);
  } catch (erro) {
    console.error('Erro ao criar curso:', erro);
    throw erro;
  }
}

// Atualizar curso por ID
export async function atualizarCurso(id, { nome, carga_horaria }) {
  try {
    const conexao = await pool.connect();
    await conexao.request()
      .input('id', id)
      .input('nome', nome)
      .input('carga_horaria', carga_horaria)
      .query(`
        UPDATE cursos
        SET nome = @nome, carga_horaria = @carga_horaria
        WHERE id = @id
      `);
  } catch (erro) {
    console.error('Erro ao atualizar curso:', erro);
    throw erro;
  }
}

// Deletar curso por ID
export async function deletarCurso(id) {
  try {
    const conexao = await pool.connect();
    await conexao.request()
      .input('id', id)
      .query('DELETE FROM cursos WHERE id = @id');
  } catch (erro) {
    console.error('Erro ao deletar curso:', erro);
    throw erro;
  }
}

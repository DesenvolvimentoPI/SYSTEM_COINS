import { pool } from '../database/connection.js';

// Registrar ganho de pontos
export async function registrarPontosGanhos(idAluno, quantidade, motivo) {
  try {
    const conexao = await pool.connect();

    // Inserir no extrato
    await conexao.request()
      .input('idAluno', idAluno)
      .input('quantidade', quantidade)
      .input('motivo', motivo)
      .query(`
        INSERT INTO extrato_pontos_ganhos (id_aluno, quantidade, motivo, data)
        VALUES (@idAluno, @quantidade, @motivo, GETDATE())
      `);

    // Atualizar saldo na tabela pontos
    await conexao.request()
      .input('idAluno', idAluno)
      .input('quantidade', quantidade)
      .query(`
        UPDATE pontos
        SET saldo = saldo + @quantidade
        WHERE id_aluno = @idAluno
      `);
  } catch (erro) {
    console.error('Erro ao registrar pontos ganhos:', erro);
    throw erro;
  }
}

// Listar extrato de pontos ganhos de um aluno
export async function listarPontosGanhos(idAluno) {
  try {
    const conexao = await pool.connect();
    const resultado = await conexao.request()
      .input('idAluno', idAluno)
      .query(`
        SELECT * FROM extrato_pontos_ganhos
        WHERE id_aluno = @idAluno
        ORDER BY data DESC
      `);
    return resultado.recordset;
  } catch (erro) {
    console.error('Erro ao listar pontos ganhos:', erro);
    throw erro;
  }
}

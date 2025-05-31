import { pool } from '../database/connection.js';

// Registrar ganho de pontos
export async function registrarPontosGanhos(idAluno, quantidade, motivo) {
  try {
    const conexao = await pool.connect();

    // Inserir no extrato de pontos ganhos
    await conexao.request()
      .input('idAluno', idAluno)
      .input('quantidade', quantidade)
      .input('motivo', motivo)
      .query(`
        INSERT INTO extrato_pontos_ganhos (id_aluno, pontos_ganhos, motivo, data_ganho)
        VALUES (@idAluno, @quantidade, @motivo, GETDATE())
      `);

    // Verificar se o aluno já possui um registro de saldo
    const existe = await conexao.request()
      .input('idAluno', idAluno)
      .query('SELECT COUNT(*) AS total FROM pontos WHERE id_aluno = @idAluno');

    const total = existe.recordset[0].total;

    if (total > 0) {
      // Atualiza saldo
      await conexao.request()
        .input('idAluno', idAluno)
        .input('quantidade', quantidade)
        .query(`
          UPDATE pontos
          SET valor_pontos = valor_pontos + @quantidade
          WHERE id_aluno = @idAluno
        `);
    } else {
      // Cria novo registro com saldo inicial
      await conexao.request()
        .input('idAluno', idAluno)
        .input('quantidade', quantidade)
        .query(`
          INSERT INTO pontos (id_aluno, valor_pontos)
          VALUES (@idAluno, @quantidade)
        `);
    }

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
        ORDER BY data_ganho DESC
      `);
    return resultado.recordset;
  } catch (erro) {
    console.error('Erro ao listar pontos ganhos:', erro);
    throw erro;
  }
}

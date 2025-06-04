import { pool } from '../database/connection.js';

// Registrar gasto de pontos (resgate de produto)
export async function registrarPontosGastos(idAluno, quantidade, motivo) {
  try {
    const conexao = await pool.connect();

    // Verificar saldo atual
    const { recordset } = await conexao.request()
      .input('idAluno', idAluno)
      .query('SELECT valor_pontos FROM pontos WHERE id_aluno = @idAluno');

    const saldoAtual = recordset[0]?.valor_pontos ?? 0;

    if (saldoAtual < quantidade) {
      throw new Error('Saldo insuficiente');
    }

    // Inserir no extrato de pontos gastos
    await conexao.request()
      .input('idAluno', idAluno)
      .input('quantidade', quantidade)
      .input('motivo', motivo)
      .query(`
        INSERT INTO extrato_pontos_gastos (id_aluno, pontos_gastos, motivo, data_gasto)
        VALUES (@idAluno, @quantidade, @motivo, GETDATE())
      `);

    // Atualizar saldo na tabela pontos
    await conexao.request()
      .input('idAluno', idAluno)
      .input('quantidade', quantidade)
      .query(`
        UPDATE pontos
        SET valor_pontos = valor_pontos - @quantidade
        WHERE id_aluno = @idAluno
      `);

  } catch (erro) {
    console.error('Erro ao registrar pontos gastos:', erro);
    throw erro;
  }
}

// Listar extrato de pontos gastos de um aluno
export async function listarPontosGastos(idAluno) {
  try {
    const conexao = await pool.connect();
    const resultado = await conexao.request()
      .input('idAluno', idAluno)
      .query(`
        SELECT * FROM extrato_pontos_gastos
        WHERE id_aluno = @idAluno
        ORDER BY data_gasto DESC
      `);
    return resultado.recordset;
  } catch (erro) {
    console.error('Erro ao listar pontos gastos:', erro);
    throw erro;
  }
}

// Exporta as duas funções corretamente

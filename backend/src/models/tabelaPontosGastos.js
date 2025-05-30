import { pool } from '../database/connection.js';

// Registrar gasto de pontos
export async function registrarPontosGastos(idAluno, quantidade, produto) {
  try {
    const conexao = await pool.connect();

    // Verificar saldo
    const { recordset } = await conexao.request()
      .input('idAluno', idAluno)
      .query('SELECT saldo FROM pontos WHERE id_aluno = @idAluno');

    const saldoAtual = recordset[0]?.saldo ?? 0;

    if (saldoAtual < quantidade) {
      throw new Error('Saldo insuficiente');
    }

    // Inserir no extrato
    await conexao.request()
      .input('idAluno', idAluno)
      .input('quantidade', quantidade)
      .input('produto', produto)
      .query(`
        INSERT INTO extrato_pontos_gastos (id_aluno, quantidade, produto, data)
        VALUES (@idAluno, @quantidade, @produto, GETDATE())
      `);

    // Subtrair do saldo
    await conexao.request()
      .input('idAluno', idAluno)
      .input('quantidade', quantidade)
      .query(`
        UPDATE pontos
        SET saldo = saldo - @quantidade
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
        ORDER BY data DESC
      `);
    return resultado.recordset;
  } catch (erro) {
    console.error('Erro ao listar pontos gastos:', erro);
    throw erro;
  }
}

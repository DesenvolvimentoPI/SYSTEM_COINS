// src/controllers/alunosController.js
import { listarAlunos } from '../models/tabelaAlunos.js';
import { pool } from '../database/connection.js';
import { sql } from '../database/connection.js';
import bcrypt from 'bcrypt';

// Importa a conexão com o banco
//Importa a criptografia
 
function formatarCpfInt(cpfInt) {
    cpfInt = cpfInt.replace(/\D/g, '');  // remove tudo que não for número
    cpfInt = cpfInt.replace(/^0+/, '');  // remove zeros à esquerda
    return cpfInt
  }
 
function formatarCpf(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
 
const criarCadastroAlunos= async (req, res) => {
  const { nome, sobrenome, cpf, email, senha } = req.body;
 
  if (!nome || !sobrenome|| !cpf || !email || !senha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
  }
 
  if (!email.includes('@')) {
    return res.json({erro: 'Preencha com os '})
  }
 
  const cpfFormatado = formatarCpf(cpf);
  const cpfNumInt = formatarCpfInt(cpf);
  const senhaHash = await bcrypt.hash(senha, 10);
 
  try {
    
 
      // Verifica se já existe usuário com o mesmo CPF ou e-mail
      const resultado = await pool.request()
          .input('cpf', sql.BigInt, cpfNumInt)
          .query(`
              SELECT * FROM alunos
              WHERE cpf = @cpf
          `);
 
      if (resultado.recordset.length > 0) {
          return res.status(400).json({ erro: 'CPF já cadastrado.' });
      }
 
      // Faz a inserção se estiver tudo certo
      await pool.request()
          .input('nome', sql.VarChar, nome)
          .input('sobrenome', sql.VarChar, sobrenome)
          .input('cpf', sql.BigInt, cpfNumInt)
          .input('cpfstr', sql.VarChar, cpfFormatado)
          .input('email', sql.VarChar, email)
          .input('openpassword', sql.VarChar, senha)
          .input('passwordhash', sql.VarChar, senhaHash)
          .query(`
              INSERT INTO alunos (nome, sobrenome, cpf, cpf_str, login, openpassword, passwordhash)
              VALUES (@nome, @sobrenome, @cpf, @cpfstr, @email, @openpassword, @passwordhash)
          `);
 
      return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao inserir no banco de dados.' });
  }
};
 
export default criarCadastroAlunos;

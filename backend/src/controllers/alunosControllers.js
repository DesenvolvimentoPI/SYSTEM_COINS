// src/controllers/alunosController.js
import { pool } from '../database/connection.js';
import { sql } from '../database/connection.js';
import bcrypt from 'bcrypt';

//ROTA DE POST
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
      /* Verifica se o e-mail ja esta na tabela administrativo */
      const resultadoAdministrativo = await pool.request()
            .input('email', sql.VarChar, email)
            .query( `
                select *
                from administrativo
                where email = @email
              `)

      if(resultadoAdministrativo.recordset.length > 0){
        return res.status(400).json({error: 'E-mail já cadastrado em administrativo, por favor insira outro e-mail!'})
      }

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

// ROTA GET

export async function listarAlunos(req, res) {
    try {
      const resultado = await pool.request().query('SELECT id, nome, sobrenome, cpf, cpf_str, login FROM alunos');
      res.json(resultado.recordset);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao buscar alunos' });
    }
  }
  
// ROTA DELETE

export async function deletarAluno(req, res) {
  const { id } = req.params;
  const idNum = parseInt(id); // garante que seja número

  if (isNaN(idNum)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  try {
    const resultado = await pool.request()
      .input('id', sql.Int, idNum)
      .query('DELETE FROM alunos WHERE id = @id');

    if (resultado.rowsAffected[0] === 0) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    res.json({ mensagem: 'Aluno deletado com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao deletar aluno.' });
  }
}

// ROTA PUT

export async function atualizarAluno(req, res) {
  const { id } = req.params;
  const { nome, sobrenome, cpf, email, senha } = req.body;

  if (!nome || !sobrenome || !cpf || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
  }

  const cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  const cpfNumInt = cpf.replace(/\D/g, '');
  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    const resultado = await pool.request()
      .input('id', sql.Int, parseInt(id))
      .input('nome', sql.VarChar, nome)
      .input('sobrenome', sql.VarChar, sobrenome)
      .input('cpf', sql.BigInt, cpfNumInt)
      .input('cpfstr', sql.VarChar, cpfFormatado)
      .input('email', sql.VarChar, email)
      .input('openpassword', sql.VarChar, senha)
      .input('passwordhash', sql.VarChar, senhaHash)
      .query(`
        UPDATE alunos
        SET nome = @nome,
            sobrenome = @sobrenome,
            cpf = @cpf,
            cpf_str = @cpfstr,
            login = @email,
            openpassword = @openpassword,
            passwordhash = @passwordhash
        WHERE id = @id
      `);

    if (resultado.rowsAffected[0] === 0) {
      return res.status(404).json({ erro: 'Aluno não encontrado.' });
    }

    res.json({ mensagem: 'Aluno atualizado com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar o aluno.' });
  }
}


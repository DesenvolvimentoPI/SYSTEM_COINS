import { listarEmpresas } from '../models/tabelaEmpresas.js';
import { pool } from '../database/connection.js';
import { sql } from '../database/connection.js';
import bcrypt from 'bcrypt'


// Remove caracteres não numéricos e zeros à esquerda
function formatarCnpjInt(cnpjInt) {
  const str = String(cnpjInt).replace(/\D/g, '');
  return str.replace(/^0+/, '');
}

// Formata CNPJ com pontos e traços (ex: 00.000.000/0000-00)
function formatarCnpj(cnpj) {
  if (!cnpj) return '';
  let str = String(cnpj).replace(/\D/g, '');
  str = str.padStart(14, '0');
  return str.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

// ROTA POST

const criarCadastroEmpresas = async (req, res) => {
  const { razao, nome, cnpj, endereco, complemento, email, senha } = req.body;

  if (!razao || !nome || !cnpj || !endereco || !complemento || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
  }

  const cnpjFormatado = formatarCnpj(cnpj);
  const cnpjNumInt = formatarCnpjInt(cnpj);
  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    const resultado = await pool.request()
      .input('cnpj', sql.BigInt, cnpjNumInt)
      .query('SELECT * FROM empresas WHERE cnpj = @cnpj');

    if (resultado.recordset.length > 0) {
      return res.status(400).json({ erro: 'CNPJ já cadastrado.' });
    }

    await pool.request()
      .input('razao', sql.VarChar, razao)
      .input('nome', sql.VarChar, nome)
      .input('cnpj', sql.BigInt, cnpjNumInt)
      .input('cnpjstr', sql.VarChar, cnpjFormatado)
      .input('endereco', sql.VarChar, endereco)
      .input('complemento', sql.VarChar, complemento)
      .input('email', sql.VarChar, email)
      .input('openpassword', sql.VarChar, senha)
      .input('passwordhash', sql.VarChar, senhaHash)
      .query(`
        INSERT INTO empresas (
          razão_social, nome_fantasia, cnpj, cnpj_str,
          endereco, complemento, email, openpassword, passwordhash, data_criacao
        )
        VALUES (
          @razao, @nome, @cnpj, @cnpjstr,
          @endereco, @complemento, @email, @openpassword, @passwordhash, dateadd(hour, -3, getdate())
        )
      `);

    return res.status(201).json({ mensagem: 'Empresa cadastrada com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao inserir no banco de dados.' });
  }
};
export default criarCadastroEmpresas;

// ROTA GET

export async function allEmpresas(req, res) {
  try {
    const resultado = await pool.request()
      .query('SELECT id, razão_social, nome_fantasia, cnpj_str, endereco, complemento FROM empresas');

    res.json(resultado.recordset);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar empresas.' });
  }
}

// ROTA PUT

export async function atualizarEmpresa(req, res) {
  const { id } = req.params;
  const { razao, nome, cnpj, endereco, complemento } = req.body;

  if (!razao || !nome || !cnpj || !endereco || !complemento) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
  }

  const cnpjFormatado = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  const cnpjNumInt = cnpj.replace(/\D/g, '');

  try {
    const resultado = await pool.request()
      .input('id', sql.Int, parseInt(id))
      .input('razao', sql.VarChar, razao)
      .input('nome', sql.VarChar, nome)
      .input('cnpj', sql.BigInt, cnpjNumInt)
      .input('cnpjstr', sql.VarChar, cnpjFormatado)
      .input('endereco', sql.VarChar, endereco)
      .input('complemento', sql.VarChar, complemento)
      .query(`
        UPDATE empresas
        SET razão_social = @razao,
            nome_fantasia = @nome,
            cnpj = @cnpj,
            cnpj_str = @cnpjstr,
            endereco = @endereco,
            complemento = @complemento
        WHERE id = @id
      `);

    if (resultado.rowsAffected[0] === 0) {
      return res.status(404).json({ erro: 'Empresa não encontrada.' });
    }

    res.json({ mensagem: 'Empresa atualizada com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar empresa.' });
  }
}


// ROTA DELETE

export async function deletarEmpresa(req, res) {
  const { id } = req.params;
  const idNum = parseInt(id);

  if (isNaN(idNum)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  try {
    const resultado = await pool.request()
      .input('id', sql.Int, idNum)
      .query('DELETE FROM empresas WHERE id = @id');

    if (resultado.rowsAffected[0] === 0) {
      return res.status(404).json({ erro: 'Empresa não encontrada' });
    }

    res.json({ mensagem: 'Empresa deletada com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao deletar empresa.' });
  }
}

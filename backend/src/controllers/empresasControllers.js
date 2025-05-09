import { listarEmpresas } from '../models/tabelaEmpresas.js';
import { pool } from '../database/connection.js';
import { sql } from '../database/connection.js';

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

const criarCadastroEmpresas = async (req, res) => {
  const { razao, nome, cnpj, endereco, complemento } = req.body;

  if (!razao || !nome || !cnpj || !endereco || !complemento) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
  }

  const cnpjFormatado = formatarCnpj(cnpj);
  const cnpjNumInt = formatarCnpjInt(cnpj);

  try {
    // Verifica se já existe empresa com o mesmo CNPJ
    const resultado = await pool.request()
      .input('cnpj', sql.BigInt, cnpjNumInt)
      .query(`
        SELECT * FROM empresas
        WHERE cnpj = @cnpj
      `);

    if (resultado.recordset.length > 0) {
      return res.status(400).json({ erro: 'CNPJ já cadastrado.' });
    }

    // Faz a inserção se estiver tudo certo
    await pool.request()
      .input('razao', sql.VarChar, razao)
      .input('nome', sql.VarChar, nome)
      .input('cnpj', sql.BigInt, cnpjNumInt)
      .input('cnpjstr', sql.VarChar, cnpjFormatado)
      .input('endereco', sql.VarChar, endereco)
      .input('complemento', sql.VarChar, complemento)
      .query(`
        INSERT INTO empresas (razão_social, nome_fantasia, cnpj, cnpj_str, endereco, complemento, data_criacao)
        VALUES (@razao, @nome, @cnpj, @cnpjstr, @endereco, @complemento, dateadd(hour, -3, getdate()))
      `);

    return res.status(201).json({ mensagem: 'Empresa cadastrada com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao inserir no banco de dados.' });
  }
};

export default criarCadastroEmpresas;
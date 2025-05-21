import { pool } from '../database/connection.js';
import { sql } from '../database/connection.js';
import bcrypt from 'bcrypt';

export default async function loginEmpresa(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios!" });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ erro: "Email inválido!" });
  }

  try {
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM empresas WHERE email = @email');

    const empresa = result.recordset[0];

    if (!empresa) {
      return res.status(400).json({ erro: "Email não encontrado!" });
    }

    const senhaCorreta = await bcrypt.compare(senha, empresa.passwordhash);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta!" });
    }

    res.status(200).json({
      mensagem: "Empresa autenticada com sucesso!",
      empresa: {
        id: empresa.id,
        nome_fantasia: empresa.nome_fantasia,
        cnpj: empresa.cnpj_str
      }
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao realizar login da empresa." });
  }
}

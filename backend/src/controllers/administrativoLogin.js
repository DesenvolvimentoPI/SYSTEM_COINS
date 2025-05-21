import { pool } from '../database/connection.js'
import { sql } from '../database/connection.js'
import bcrypt from 'bcrypt'

const loginAdministrativo = async (req, res) => {
    const { email, senha} = req.body

    if (!email || !senha) {
        return res.status(400).json({error: "Preencha todos os campos!"})
    }

    if (!email.includes('@')) {
        return res.status(400).json({error: "E-mail precisa conter @!"})
    }

    try {

        const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query(`select * from administrativo where email = @email`)

        const resultadoConsulta = result.recordset[0]

        if (!resultadoConsulta) {
            return res.status(400).json({error: "E-mail não encontrado!"})
        }

        const senhaCorreta = await bcrypt.compare(senha, resultadoConsulta.passwordhash)

        if (!senhaCorreta) {
            return res.status(400).json({error: "Senha incorreta!"})
        }

        res.status(200).json({
            mensagem: "Usuário confirmado, bem vindo!",
            usuario: {
              nome: resultadoConsulta.nome,
              email: resultadoConsulta.email
            }
          });

    }catch(error){
        console.log(error)
        res.status(500).json({error: "Erro ao fazer login!"})
    };
};

export default loginAdministrativo
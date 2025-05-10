import { pool } from '../database/connection.js';
import { sql } from '../database/connection.js';
import bcrypt from 'bcrypt'

const login = async (req,res) => {
    const {email, senha} = req.body

    if (!email || !senha){
        return res.status(400).json({erro: "Todos os campos precisam estar preenchidos!"})
    }

    try {
        const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query (`select * from alunos where login = @email`)

        const resultadoConsulta = result.recordset[0];

        if (!resultadoConsulta) {
            return res.status(400).json({erro: "E-mail não encontrado!"})
        }

        const senhaCorreta = await bcrypt.compare(senha, resultadoConsulta.passwordhash )

        if (!senhaCorreta) {
            return res.status(401).json({erro: "Senha incorreta!"})
        }

        res.status(200).json({mensagem: "Usuário authenticado com sucesso! Seja bem vindo: ", resultadoConsulta: {nome: resultadoConsulta.nome}})
    } catch (erro) {
        console.error(erro)
        res.status(500).json({error: "Erro ao encontrar o usuário"})
    }
};

export default login
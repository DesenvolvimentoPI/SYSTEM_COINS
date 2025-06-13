import { pool } from '../database/connection.js';
import { sql } from '../database/connection.js';

const buscarEmailBusca = async(req, res) => {
    const {email, cpf} = req.body
    
    if(!email || ! cpf){
        return res.status(400).json({message: "Erro: preencha todos os campos!"})
    }

    if(!email.include('@')){
        return res.status(400).json({message: "Erro: coloque seu e-mail com @!"})
    }

    if(cpf.length !== 11){
        return res.status(501).json({message: "Erro: CPF invalido!"})
    }

    try{

        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('cpf', sql.BigInt, cpf)
            .query(`
                select id
                from alunos
                where cpf = @cpf and login = @email
                union
                select id
                from administrativo
                where cpf = @cpf and email = @email
                `)
        const resposta = result.recordset[0];

        if(!resposta){
            return res.status(400).json({message: "Erro: usuário não encontrado"})
        }else{
            res.status(201).json({message: "Usuário encontrado com sucesso!"})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao buscar o usuário"})
    }
}
import { pool } from '../database/connection.js';
import { sql } from '../database/connection.js';
import bcrypt from 'bcrypt'

const AlterarSenha = async(req, res) => {
    const { email, novaSenha } = req.body;
    const senhaHash = await bcrypt.hash(novaSenha, 10)

    if (!email || !novaSenha) {
        return res.status(400).json({ message: "Erro: E-mail e nova senha são obrigatórios!" });
    }

    if (novaSenha.length < 8) { 
        return res.status(400).json({ message: "Erro: A senha deve ter no mínimo 6 caracteres!" });
    }

    try{

        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('novaSenha', sql.VarChar, senhaHash)
            .query(`
                UPDATE alunos
                SET passwordhash = @novaSenha
                WHERE login = @email;

                UPDATE administrativo
                SET passwordhash = @novaSenha
                WHERE email = @email;
            `);

            if (result.rowsAffected == 0) {
                return res.status(404).json({ message: "Erro: Usuário não encontrado para este e-mail." });
            }
    
            res.status(200).json({ message: "Senha alterada com sucesso!" });

    }catch(err){
        console.error("Erro ao alterar a senha:", err);
        res.status(500).json({ error: "Erro interno do servidor ao alterar a senha." });
    }
}

export default AlterarSenha
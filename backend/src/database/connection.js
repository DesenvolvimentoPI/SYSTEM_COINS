import mysql2 from 'mysql2'; // Puxando a depêdencia do banco de dados
import dotenv from 'dotenv';

dotenv.config();

// Configuração de conexão com o banco
const connection = mysql2.createConnection({

    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT

});


// Teste de conexão

connection.connect((err) => {
    if (err) {
        console.log("Erro de conexão com banco de dados", err.message) //Esse "err.message", ajuda a identifica qual erro o banco de dados está retornando
    }

    else {
        console.log("FICA FELIZ AGORA O BANCO CONECTOU!!")
    }
}); 


console.log(process.env.DATABASE_NAME)

export default connection;

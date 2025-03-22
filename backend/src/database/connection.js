import mysql2 from 'mysql2'; // Puxando a depêdencia do banco de dados
import dotenv from 'dotenv'; // Puxando a depêdencia do .ENV 


dotenv.config(); // Carrega as variaveis do arquivo .ENV ou seja, todos dados que está lá pode ser carregado nestá aplicação agora



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
        console.log("Conexão realizada com sucesso!")
    }
}); 
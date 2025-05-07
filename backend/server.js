import express from "express";
import "./src/database/connection.js";
import dotenv from 'dotenv'; // Puxando a depêdencia do .ENV
import alunoRoutes from "./src/routes/alunoRoutes.js"



dotenv.config(); // Carrega as variaveis do arquivo .ENV ou seja, todos dados que está lá pode ser carregado nestá aplicação agora

// Teste para saber se o NODE está rodando
const app = express(); // Puxando o framework EXPRESS para dentro de uma variavel com nome SERVER
app.use(express.json());

app.use('/api', alunoRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando karalho!!") // .listen para "Para escutar a porta 3000, onde o servidor está rodando"
});



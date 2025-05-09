import express from "express"; /* Importa Express */
import "./src/database/connection.js"; /* Importa conexão */
import dotenv from 'dotenv'; // Puxando a depêdencia do .ENV
import alunoRoutes from "./src/routes/alunoRoutes.js" /* Importa rota de cadastro alunos */
import empresasRoutes from "./src/routes/empresasRoutes.js" /* Importa rota de cadastro empresas */
import administrativoRouter from "./src/routes/administrativoRoutes.js" /* Importa rota de cadastro administrativo */



dotenv.config(); // Carrega as variaveis do arquivo .ENV ou seja, todos dados que está lá pode ser carregado nestá aplicação agora

// Teste para saber se o NODE está rodando
const app = express(); // Puxando o framework EXPRESS para dentro de uma variavel com nome SERVER
app.use(express.json());

app.use('/api', alunoRoutes); /* Torna usavel rota de cadastro de alunos */

app.use('/api', empresasRoutes); /* Torna usavel rota de cadastro de empresas */

app.use('/api', administrativoRouter) /* Torna usavel rota de cadastro administrativo */

app.listen(3000, () => {
    console.log("Servidor rodando karalho!!") // .listen para "Para escutar a porta 3000, onde o servidor está rodando"
});



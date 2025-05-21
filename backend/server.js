import express from "express"; /* Importa Express */
import "./src/database/connection.js"; /* Importa conexão */
import dotenv from 'dotenv'; // Puxando a depêdencia do .ENV
import alunoRoutes from "./src/routes/alunoRoutes.js" /* Importa rota de cadastro alunos */
import empresasRoutes from "./src/routes/empresasRoutes.js" /* Importa rota de cadastro empresas */
import loginEmpresa from "./src/controllers/empresasLogin.js";
import administrativoRouter from "./src/routes/administrativoRoutes.js" /* Importa rota de cadastro administrativo */
import loginAlunos from "./src/routes/alunosLogin.js" /* Importa rota de login alunos */
import loginAdministrativo from "./src/routes/administrativoLogin.js"; /* Importa rota de login administrativo */
import cors from 'cors';



dotenv.config(); // Carrega as variaveis do arquivo .ENV ou seja, todos dados que está lá pode ser carregado nestá aplicação agora

// Teste para saber se o NODE está rodando
const app = express(); // Puxando o framework EXPRESS para dentro de uma variavel com nome SERVER

app.use(cors());

app.use(express.json());

app.use('/api/alunos', alunoRoutes); /* Torna usavel rota de cadastro de alunos */

app.use('/api/loginalunos', loginAlunos); /* Rota de login de alunos */

app.use('/api/admin', administrativoRouter); /* Torna usavel rota de cadastro administrativo */

app.use('/api/loginadmin', loginAdministrativo); /* Rota de login administrato */

app.use('/api/empresas', empresasRoutes); /* Torna usavel rota de cadastro de empresas */

app.use('/api/loginempresas', loginEmpresa); /* Torna usavel rota de cadastro de empresas */



try {
    app.listen(3000, () => {
      console.log("✅ Servidor NODE rodando!");
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
  }
  



# 🪙 SYSTEM_COINS – Backend API

Sistema de controle de dados para alunos, empresas e administrativos, com foco em segurança, modularização e integração via REST API.

---

## 🚀 Tecnologias utilizadas

- **Node.js + Express**
- **Azure SQL Server**
- **MSSQL (npm `mssql`)**
- **Bcrypt** para senhas seguras
- **Dotenv** para variáveis de ambiente
- **CORS** habilitado
- **Estrutura MVC** (models, controllers, routes)

---

## 📁 Estrutura de pastas

```
/backend
├── server.js
├── .env
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── database/
```

---

## 🔐 Segurança

- Senhas nunca são retornadas nas rotas públicas (LGPD)
- Armazenamento com hash `bcrypt`
- CORS habilitado para integração segura com frontend

---

## 📌 Endpoints da API (`/api/alunos`)

| Método | Rota                  | Descrição                   |
|--------|-----------------------|-----------------------------|
| GET    | `/api/alunos`         | Lista todos os alunos       |
| POST   | `/api/alunos`         | Cadastra novo aluno         |
| PUT    | `/api/alunos/:id`     | Atualiza dados do aluno     |
| DELETE | `/api/alunos/:id`     | Remove um aluno             |

---

## ⚙️ Como rodar o projeto localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/system_coins.git
cd system_coins/backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o `.env`:
```env
DB_SERVER=seu-servidor.database.windows.net
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=nome-do-banco
DB_PORT=1433
```

4. Rode o servidor:
```bash
npm start
```

---

## 🧪 Testes via Postman

- POST `/api/alunos`
```json
{
  "nome": "Lucas",
  "sobrenome": "Costa",
  "cpf": "12345678900",
  "email": "lucas@email.com",
  "senha": "123456"
}
```

---

## 📦 Deploy

Este projeto pode ser hospedado no:
- [Render](https://render.com/)
- [Azure App Service](https://azure.microsoft.com/pt-br/products/app-service/)
- [Railway](https://railway.app/)

---

## 👨‍💻 Desenvolvido por

---

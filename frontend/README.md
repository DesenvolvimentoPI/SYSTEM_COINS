
# SYSTEM_COINS – Frontend

Este projeto é a interface frontend do sistema **SYSTEM_COINS**, que se comunica com uma API REST desenvolvida em Node.js/Express e conectada ao banco de dados **Azure SQL Server**.

---

## 🧩 Tecnologias utilizadas

- React.js (via Create React App)
- Fetch API para consumo da API REST
- Estrutura modular de serviços (`/src/services`)

---

## 🌐 API Backend

O backend está hospedado no Render e responde em:

```
https://system-coins-new.onrender.com/api/alunos
```

### Endpoints disponíveis:

| Método | Rota                       | Descrição                   |
|--------|----------------------------|-----------------------------|
| GET    | `/api/alunos`             | Lista todos os alunos       |
| POST   | `/api/alunos`             | Cria um novo aluno          |
| PUT    | `/api/alunos/:id`         | Atualiza os dados de aluno  |
| DELETE | `/api/alunos/:id`         | Remove um aluno             |

---

## ⚙️ Como rodar o projeto frontend localmente

1. Clone o repositório (ou entre na pasta do projeto):

```bash
cd SYSTEM_COINS/frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
```

O React será aberto automaticamente no navegador em:

```
http://localhost:3000
```

---

## 📁 Estrutura do projeto

```
/frontend
├── public/
├── src/
│   ├── services/
│   │   └── api.js          ← Lógica de integração com o backend
│   ├── App.js              ← Teste de conexão via console
│   └── index.js
└── package.json
```

---

## 🔗 Integração com o backend

O arquivo `src/services/api.js` já está preparado com as funções:

```js
listarAlunos()
cadastrarAluno(dados)
atualizarAluno(id, dados)
deletarAluno(id)
```

### Exemplo de uso no React:

```jsx
import { listarAlunos } from './services/api';

useEffect(() => {
  async function carregarAlunos() {
    const dados = await listarAlunos();
    console.log(dados);
  }
  carregarAlunos();
}, []);
```

---

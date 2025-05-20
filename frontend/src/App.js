import React, { useState } from 'react';
import { cadastrarAluno } from './services/api';

function App() {
  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await cadastrarAluno(form);
      console.log('Aluno cadastrado com sucesso:', resposta);
      alert('Aluno cadastrado!');
      setForm({
        nome: '',
        sobrenome: '',
        cpf: '',
        email: '',
        senha: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      alert('Erro ao cadastrar aluno. Verifique os campos.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cadastrar novo aluno</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        /><br /><br />
        <input
          type="text"
          name="sobrenome"
          value={form.sobrenome}
          onChange={handleChange}
          placeholder="Sobrenome"
          required
        /><br /><br />
        <input
          type="text"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          placeholder="CPF"
          required
        /><br /><br />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        /><br /><br />
        <input
          type="password"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          placeholder="Senha"
          required
        /><br /><br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default App;

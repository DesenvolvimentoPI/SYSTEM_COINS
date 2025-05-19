import React, { useEffect } from 'react';
import { listarAlunos } from './services/api';

function App() {
  useEffect(() => {
    async function carregar() {
      const alunos = await listarAlunos();
      console.log('Alunos da API:', alunos);
    }
    carregar();
  }, []);

  return <div>Testando conexão com backend... Veja o console.</div>;
}

export default App;

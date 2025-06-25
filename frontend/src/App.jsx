import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Adicione 'Navigate'
import Inicio from './pages/inicio';
import Tipo_login from './pages/tipo_login';
import Login_administrativo from './pages/login_administrativo';
import Login_aluno from './pages/login_aluno';
import PaginaAdministrativo from './pages/administrativo';
import CriarAluno from './pages/criacaoAluno';
import CriarAdministrativo from './pages/criacaoAdministrativo';
import CriarCurso from './pages/criarCurso';
import CriarEmpresa from './pages/criarEmpresa';
import ConseguirEmailAlteraSenha from './pages/pegarEmail';
import AlterarSenha from './pages/mudarSenha'; // Note que você usou 'mudarSenha' aqui, mas 'AlterarSenha' no seu componente. Certifique-se que o nome do arquivo e do componente são consistentes.
import Inicio_alunos from './pages/inicio_alunos';
import PerfilAluno from './pages/perfilAluno';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Inicio />} />
        <Route path='/tipo' element={<Tipo_login/>}/>
        <Route path='/loginAdministrativo' element={<Login_administrativo/>}/>
        <Route path='/loginAlunos' element={<Login_aluno/>}/>
        <Route path='/Administrativo' element={<PaginaAdministrativo/>}/>
        <Route path='/criarAluno' element={<CriarAluno/>}/>
        <Route path='/criarAdministrativo' element={<CriarAdministrativo/>}/>
        <Route path='/criarCurso' element={<CriarCurso/>}/>
        <Route path='/criarEmpresa' element={<CriarEmpresa/>}/>
        <Route path='/conseguirEmailSenha' element={<ConseguirEmailAlteraSenha/>}/>
        <Route path='/alterarSenha' element={<AlterarSenha/>}/>
        <Route path='/Alunos' element={<Inicio_alunos/>}/>
        <Route path='/AlunoPerfil' element={<PerfilAluno/>}/>

        {/* CATCH-ALL ROUTE: Redireciona para a página inicial ('/') se a URL não corresponder a nenhuma rota definida */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App;
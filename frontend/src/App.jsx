import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio';
import Tipo_login from './pages/tipo_login';
import Login_administrativo from './pages/login_administrativo';
import Login_aluno from './pages/login_aluno';
import PaginaAdministrativo from './pages/administrativo';
import CriarAluno from './pages/criacaoAluno';
import CriarAdministrativo from './pages/criacaoAdministrativo';
import CriarCurso from './pages/criarCurso';
import CriarEmpresa from './pages/criarEmpresa';
import ConseguirEmailAlteraSenha from './pegarEmail';

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
      </Routes>
    </Router>
  )
}

export default App

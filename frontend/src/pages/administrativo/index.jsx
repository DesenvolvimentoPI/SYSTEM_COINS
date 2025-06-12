import './style.css';
import { Link, useNavigate } from 'react-router-dom';

export default function PaginaAdministrativo() {
    return(
        <>
            <div className="container-administrativo">
                <div className='container-segundario-administrativo'>
                    <h1>Seja bem vindo</h1>
                    <p>O que você deseja fazer?</p>
                    <ul>
                        <li><Link to='/criarAluno'>Cadastrar Aluno</Link></li>
                        <li><Link to='/criarAdministrativo'>Cadastrar Administrativo</Link></li>
                        <li><Link to='/criarCurso'>Cadastrar Curso</Link></li>
                        <li><Link to=''>Cadastrar Empresa</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
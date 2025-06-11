import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function PaginaAdministrativo() {
    return(
        <>
            <div className="container-administrativo">
                <div className='container-segundario-administrativo'>
                    <h1>Seja bem vindo</h1>
                    <p>O que você deseja fazer?</p>
                    <ul>
                        <li><Link to=''>Cadastrar Aluno</Link></li>
                        <li><Link to=''>Cadastrar Administrativo</Link></li>
                        <li><Link to=''>Cadastrar Curso</Link></li>
                        <li><Link to=''>Cadastrar Empresa</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
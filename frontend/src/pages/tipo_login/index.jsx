import './style.css';
import { Link } from 'react-router-dom';
 
 
 
 
export default function Tipo_login() {
    return (
            <div className='container-principal_tipo_login'>
                <div className='container'>
                    <h1 className='titulo'>LOGIN</h1>
                    <ul className='tipo_login_link'>
                        <li><Link to='/loginAlunos'>SOU ALUNO</Link></li>
                        <li><Link to='/loginAdministrativo'>SOU ADMINISTRATIVO</Link></li>
                    </ul>
                </div>
            </div>
    )
}
import './style.css';
import { Link } from 'react-router-dom';
 
 
 
 
export default function Tipo_login() {
    return (
            <div className='container-principal'>
                <div className='container'>
                    <h1 className='titulo'>LOGIN</h1>
                    <Link to='/tipo'>SOU ALUNO</Link>
                    <Link to='/tipo'>SOU ADMINISTRATIVO</Link>
                </div>
            </div>
    )
}
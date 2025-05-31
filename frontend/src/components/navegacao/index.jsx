import './style.css'
import Logo from '../../assets/logo_sem_fundo.png'
import { Link } from 'react-router-dom';

export default function Navegacao(){
    return (
        <>
            <div className='container'>
                <nav>
                    <ul>
                        <li><Link to="/" className='menu'>Inicio</Link></li>
                        <li><Link to="/sobre">Contato</Link></li>
                        <li><Link to="/sobre">Login</Link></li>
                        <li><Link to="/sobre">Cadastro</Link></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useState } from 'react';
 
 
 
 
export default function Login_aluno() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    async function handleSubmitLogin(event) {
        event.preventDefault();
        setError('');

        try {
            const response = await api.post('/api/loginalunos', {email, senha})
            if (response.data = 200){
                localStorage.setItem('token', response.data.token); // Salve o token
                localStorage.setItem('userEmail', email); // salve o email
                console.log('Login realizado com sucesso');
                navigate('/alunos');
            }
            else{
                setError(response.data || 'Erro ao realizar login, por favor tente novamente!');
            }
        }catch (err){
            if (err = 400){
                setError(err.data || 'Erro ao realizar login, por favor verifique suas credenciais');
            } else if (err.request){
                setError(err.data.request || 'Erro ao enviar requisição, por favor entrar em contato com o suporte técnico');
            } else {
                console.error('Erro ao realizar o login', err)
            }
        }
    }
    
    return (
            <div className='container-principal_tipo_login'>
                <div className='container'>
                    <h1 className='titulo'>LOGIN ALUNO</h1>
                    <form onSubmit={handleSubmitLogin} className='form_login'>
                        <div className='inputs'>
                            <h2>E-mail</h2>
                            <input type="email" 
                            required 
                            placeholder='Digite seu E-mail'
                            onChange={event => setEmail(event.target.value)}/>
                        </div>
                        <div className='inputs'>
                            <h2>Senha</h2>
                            <input type="password" 
                            required 
                            placeholder='Digite sua Senha' 
                            onChange={event => setSenha(event.target.value)}/>
                        </div>
                        <div className='esqueceu_senha'>
                            <Link to='/conseguirEmailSenha'>Esqueci minha senha</Link>
                        </div>
                        {error && <p className='error-message'>{error}</p>}
                        <button>Acessar</button>
                    </form>
                </div>
            </div>
    )
}
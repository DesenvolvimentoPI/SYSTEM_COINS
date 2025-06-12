import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react'
import api from '../../services/api';
 
 
 
export default function Login_administrativo() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault(); // Previne o recarregamento da página
        setError(''); // Limpa mensagem de erro anterior
        try {
            // Passe um objeto com email e senha como o segundo argumento do .post()
            const response = await api.post('/api/loginadmin', { email, senha });

            // Se o login for bem-sucedido
            if (response.data = 200) {
                localStorage.setItem('token', response.data.token); // Salve o token
                localStorage.setItem('userEmail', email); // salve o email
                console.log('Login bem-sucedido:', response.data);
                navigate('/Administrativo'); // Redireciona para o dashboard administrativo
            } else {
                // Caso falhe, deixa a variavel error com o erro.
                setError(response.data.message || 'Credenciais inválidas.');
            }
        } catch (err) {
            console.error('Erro ao realizar o login', err);
            if (err.response) {
                // O servidor respondeu com um status de erro (ex: 400, 401, 500)
                setError(err.response.data.message || 'Erro ao tentar realizar login, por favor verifique suas credenciais.');
            } else if (err.request) {
                // A requisição foi feita, mas não houve resposta (servidor offline, CORS)
                setError('Sem resposta do servidor. Verifique sua conexão ou tente novamente.');
            } else {
                // Algo aconteceu na configuração da requisição que disparou um erro
                setError('Erro ao enviar requisição.');
            }
        }
    }
    
    return (
            <div className='container-principal_tipo_login'>
                <div className='container'>
                    <h1 className='titulo'>LOGIN ADMINISTRATIVO</h1>
                    <form onSubmit={handleSubmit} className='form_login'>
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
                            <Link to='/tipo'>Esqueci minha senha</Link>
                        </div>
                        {error && <p className='error-message'>{error}</p>}
                        <button type='submit'>Acessar</button>
                    </form>
                </div>
            </div>
    )
}
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';
import api from '../../services/api';

export default function AlterarSenha(){
    const [email, setEmail] = useState('');
    const [novaSenha, setSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const storedEmail = localStorage.getItem('userEmailForPasswordChange');
    setEmail(storedEmail);

    
    async function handleSubmitAlterarSenha(event){
        event.preventDefault();
        setError('')

        if(novaSenha != confirmarNovaSenha){
            setError('As senhas precisam ser iguais!')
        }

        try{
            const response =  await api.put('/api/alterarsenha', {email, novaSenha})
            if (response.status == 201){
                console.log('Login validado com sucesso.')
                alert('Login validado com sucesso!')
                navigate('/tipo');
            }else {
                setError(response.data.message)
                console.log(response.status)
                console.log(email)
            }
        }catch(err){
            if(err.response){
                setError(err.response.data.message || 'Erro ao tentar realizar o cadastro!')
            }  else {
                setError('Erro ao enviar requisição, solicite ajuda ao suporte!')
                console.log(err)
            }
        }

    }
    
    return(
        <>
            <div className='container-principal_tipo_login'>
                <form onSubmit={handleSubmitAlterarSenha} className='form_login'>
                    <h1>ALTERAR SENHA</h1>
                    <p>Digite os campos abaixo para alterar sua senha!</p>
                        <div className='inputs'>
                            <h2>Nova senha:</h2>
                            <input type="password" 
                            required
                            placeholder='Digite seu E-mail'
                            onChange={event => setSenha(event.target.value)}/>
                        </div>
                        <div className='inputs'>
                            <h2>Confirmar nova senha:</h2>
                            <input type="password" 
                            required
                            placeholder='Digite seu CPF'
                            onChange={event => setConfirmarNovaSenha(event.target.value)}/>
                        </div>
                        {error && <p className='error-message'>{error}</p>}
                        <button>Alterar Senha</button>
                </form>
            </div>
        </>
    )
}
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api';

export default function AlterarSenha(){
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    async function handleSubmitAlterarSenha(event){
        event.preventDefault();
        setError('')

        try{
            const response =  await api.post('/api/buscarEmail', {email, cpf})
            if (response == 201){
                console.log('Login validado com sucesso.')
                alert('Login validado com sucesso!')
            }else {
                setError(response.data.message)
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
                            <input type="email" 
                            required
                            placeholder='Digite seu E-mail'
                            onChange={event => setEmail(event.target.value)}/>
                        </div>
                        <div className='inputs'>
                            <h2>Confirmar nova senha:</h2>
                            <input type="number" 
                            required
                            placeholder='Digite seu CPF'
                            onChange={event => setCpf(event.target.value)}/>
                        </div>
                        {error && <p className='error-message'>{error}</p>}
                        <button>Alterar Senha</button>
                </form>
            </div>
        </>
    )
}
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function AlterarSenha() {
    const [email, setEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmailForPasswordChange');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    async function handleSubmitAlterarSenha(event) {
        event.preventDefault();
        setError('');

        if(novaSenha != confirmarNovaSenha){
            return setError('As senhas precisam ser iguais!')
        }
        if (novaSenha.length < 8){
            return setError('Sua senha deve conter no minimo 8 caracteres!')
        }

        const regexSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

        if (!regexSpecial.test(novaSenha)){
            return setError('Sua senha deve conter um caracter especial: /[!@#$%^&*()_+\-=\[\]{};\\|,.<>\/?~]/')
        }

        try {
            const response = await api.put('/api/alterarsenha', { email, novaSenha });

            if (response.status === 200) {
                console.log('Senha alterada com sucesso.');
                alert('Senha alterada com sucesso!');
                navigate('/tipo');
            } else {
                setError(response.data.message || 'Erro desconhecido ao alterar a senha.');
                console.log('Status de resposta:', response.status);
                console.log('Email enviado:', email);
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Erro ao tentar realizar o cadastro!');
            } else {
                setError('Erro ao enviar requisição, solicite ajuda ao suporte!');
                console.error('Erro na requisição:', err);
            }
        }
    }

    return (
        <div className='change-password-container'>
            <form onSubmit={handleSubmitAlterarSenha} className='password-form'>
                <h1>ALTERAR SENHA</h1>
                <p>Digite os campos abaixo para alterar sua senha!</p>

                <div className='input-group'>
                    <label htmlFor="newPassword">Nova senha:</label>
                    <input
                        type="password"
                        id="newPassword"
                        required
                        placeholder='Digite sua nova senha'
                        value={novaSenha}
                        onChange={event => setNovaSenha(event.target.value)}
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor="confirmNewPassword">Confirmar nova senha:</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        required
                        placeholder='Confirme sua nova senha'
                        value={confirmarNovaSenha}
                        onChange={event => setConfirmarNovaSenha(event.target.value)}
                    />
                </div>

                {error && <p className='error-message'>{error}</p>}

                <button type="submit">Alterar Senha</button>
            </form>
        </div>
    );
}
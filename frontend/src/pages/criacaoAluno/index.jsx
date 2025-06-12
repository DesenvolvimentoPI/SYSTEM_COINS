import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'


export default function CriarAluno(){
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleSubmitCriarAluno(event) {
        event.preventDefault();
        setError('')


        try{
            if(senha != confirmarSenha){
                return setError('As senhas precisam ser iguais!')
            }
            if (senha.length < 8){
                return setError('Sua senha deve conter no minimo 8 caracteres!')
            }

            const regexSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

            if (!regexSpecial.test(senha)){
                return setError('Sua senha deve conter um caracter especial: /[!@#$%^&*()_+\-=\[\]{};\\|,.<>\/?~]/')
            }

            if (cpf.length < 11) {
                return setError('Numeros de CPF faltando! Por favor verifique')
            }else if (cpf.length > 11){
                return setError('Você digitou mais de 11 digitos de CPF! Por favor verifique')
            }

            const response = await api.post('/api/alunos', {nome,sobrenome,cpf,email, senha})
            
            if(response.data = 201){
                console.log('Usuário criado com sucesso!')
                alert('Usuário criado com sucesso!')
                navigate('/Administrativo');
            } else {
                setError(response.data.message || 'Credenciais inválidas!');
            }
        }catch(err){
            if(err.response){
                setError(err.response.data.message || 'Erro ao tentar realizar o cadastro!')
            } else if (err.request){
                setError(err.response.message || 'Sem resposta do servidor. Verifique sua conexão!')
            } else {
                setError('Erro ao enviar requisição, solicite ajuda ao suporte!')
            }
        }
    }
    
    return(
        <div className='container-criar-alunos'>
            <div className='moldura'>
                <h1>CRIAR ALUNO</h1>
                <p>Preencha os campos abaixo</p>
                <div>
                    <form onSubmit={handleSubmitCriarAluno} className='container-inputs-criar-aluno'>
                        <div className='inputs-Criar-Aluno'>
                            <h2>Nome</h2>
                            <input type="text" 
                            required
                            placeholder='Digite o nome'
                            onChange={event => setNome(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>Sobrenome</h2>
                            <input type="Digite o sobrenome" 
                            required
                            placeholder='Confirme sua senha'
                            onChange={event => setSobrenome(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>CPF</h2>
                            <input type="text" 
                            required
                            placeholder='Digite o CPF'
                            onChange={event => setCpf(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>E-mail</h2>
                            <input type="email" 
                            required
                            placeholder='Digite um e-mail'
                            onChange={event => setEmail(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>Senha</h2>
                            <input type="password" 
                            required
                            placeholder='Digite uma senha'
                            onChange={event => setSenha(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>Confirmar Senha</h2>
                            <input type="password" 
                            required
                            placeholder='Confirme sua senha'
                            onChange={event => setConfirmarSenha(event.target.value)}/>
                        </div>
                        {error && <p className='error-message'>{error}</p>}
                        <button type='submit'>Criar Aluno</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
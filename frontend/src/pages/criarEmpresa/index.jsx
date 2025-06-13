import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'


export default function CriarEmpresa(){
    const [razao, setRazao] = useState('')
    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')
    const [complemento, setComplemento] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleSubmitCriarEmpresa(event) {
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

            if (cnpj.length < 14) {
                return setError('Numeros de CNPJ faltando! Por favor verifique')
            }else if (cnpj.length > 14){
                return setError('Você digitou mais de 14 digitos de CNPJ! Por favor verifique')
            }

            if(endereco.length > 50){
                setError('Campo endereço com muitos caracteres!')
            }

            if(complemento.length > 50){
                setError('Campo complemento com muitos caracteres!')
            }

            const response = await api.post('/api/empresas', {razao, nome, cnpj, endereco, complemento, email, senha})
            
            if(response.data = 201){
                console.log('Empresa criada com sucesso!')
                alert('Empresa criada com sucesso!')
                navigate('/Administrativo');
            } else {
                setError(response.data.message || 'Campos inválidos! Por favor verifique.');
            }
        }catch(err){
            if(err.response){
                setError(err.response.data.message || 'Erro ao tentar realizar o cadastro!')
            } else if (err.request){
                setError(err.response.message || 'Sem resposta do servidor. Verifique sua conexão!')
            } else {
                setError('Erro ao enviar requisição, solicite ajuda ao suporte!')
                console.log(err)
            }
        }
    }
    
    return(
        <div className='container-criar-alunos'>
            <div className='moldura'>
                <h1>CRIAR EMPRESA</h1>
                <p>Preencha os campos abaixo</p>
                <div>
                    <form onSubmit={handleSubmitCriarEmpresa} className='container-inputs-criar-aluno'>
                        <div className='inputs-Criar-Aluno'>
                            <h2>Razão Social</h2>
                            <input type="text" 
                            required
                            placeholder='Digite a razão social'
                            onChange={event => setRazao(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>Nome</h2>
                            <input type="Digite o sobrenome" 
                            required
                            placeholder='Digite o nome para cadastrar a empresa'
                            onChange={event => setNome(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>CNPJ</h2>
                            <input type="text" 
                            required
                            placeholder='Digite o CNPJ'
                            onChange={event => setCnpj(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>Endereço</h2>
                            <input type="text" 
                            required
                            placeholder='Digite o endereço da empresa'
                            onChange={event => setEndereco(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>Complemento</h2>
                            <input type="text" 
                            required
                            placeholder='Digite o complemento'
                            onChange={event => setComplemento(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>E-mail</h2>
                            <input type="email" 
                            required
                            placeholder='Digite um E-mail'
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
                        <button type='submit'>Criar Empresa</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
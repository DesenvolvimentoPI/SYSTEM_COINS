import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'


export default function CriarCurso(){
    const [nome, setNome] = useState('')
    const [carga_horaria, setHoras] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleSubmitCriarAluno(event) {
        event.preventDefault();
        setError('')


        try{
            const response = await api.post('/api/cursos', {nome,carga_horaria})
            
            if(response.data = 201){
                console.log('Curso criado com sucesso!')
                alert('Curso criado com sucesso!')
                navigate('/Administrativo');
            } else {
                setError(response.data.message || 'Campos faltantes!');
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
                <h1>CRIAR ADMINISTRATIVO</h1>
                <p>Preencha os campos abaixo</p>
                <div>
                    <form onSubmit={handleSubmitCriarAluno} className='container-inputs-criar-aluno'>
                        <div className='inputs-Criar-Aluno'>
                            <h2>Nome do curso</h2>
                            <input type="text" 
                            required
                            placeholder='Digite o nome'
                            onChange={event => setNome(event.target.value)}/>
                        </div>
                        <div className='inputs-Criar-Aluno'>
                            <h2>Carga Horaria</h2>
                            <input type="number" 
                            required
                            placeholder='Digite a carga horaria diária'
                            onChange={event => setHoras(event.target.value)}/>
                        </div>
                        {error && <p className='error-message'>{error}</p>}
                        <button type='submit'>Criar Curso</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
import './style.css'
import Navegacao from '../../components/navegacao'
import Fundo from '../../assets/fundo.png'




export default function Inicio() {
    return (
        <>
            <div className='container-principal'>
                <Navegacao />
                <div className='title'>
                    <h1>EDU PREMIA</h1>
                    <p>Ganhe premios sendo o melhor aluno!</p>
                </div>
            </div>
        </>
    )
}
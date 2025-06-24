import './style.css';
import perfilImg from '../../assets/icone_perfil.png';
import { useState, useEffect } from 'react'; // Importe useState e useEffect

export default function PerfilAluno() {
    // Adiciona o estado para controlar o dark mode
    // Inicializa o estado verificando se 'dark-mode' já está no localStorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('dark-mode');
        return savedMode === 'true' ? true : false;
    });

    // useEffect para adicionar/remover a classe 'dark-mode' no body
    // e salvar a preferência no localStorage
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'false');
        }
    }, [isDarkMode]); // Dependência: só executa quando isDarkMode muda

    // Função para alternar o tema
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const aluno = {
        nome: 'Matheus',
        curso: 'Análise e Desenvolvimento de Sistemas',
        saldo: 125.50,
        notas: [
            { disciplina: 'Matemática', nota: 9.0 },
            { disciplina: 'Lógica de Programação', nota: 8.5 },
            { disciplina: 'Banco de Dados', nota: 7.8 },
            { disciplina: 'Estrutura de Dados', nota: 9.3 },
            { disciplina: 'Engenharia de Software', nota: 8.7 }
        ],
        atividades: [
            'Comprou "Caneca Pro" - 14/06',
            'Ganhou 40 pontos - 13/06',
            'Resgatou "Caderno personalizado" - 10/06'
        ],
        metas: [
            'Entregar projeto até 30/06',
            'Participar de 2 eventos',
            'Fazer 80% das atividades da disciplina X'
        ],
        dadosPessoais: {
            matricula: '2023100501',
            email: 'matheus@exemplo.com',
            turma: '3º ADS - Noite'
        },
        ranking: {
            posicao: 12,
            total: 150
        }
    };

    return (
        <div className='painel_principal_perfilaluno'>
            <div className="painel-aluno">
                {/* TOPO */}
                <div className="painel-topo">
                    <div className="painel-info">
                        <img src={perfilImg} alt="Foto do Aluno" className="foto-aluno" />
                        <div>
                            <h2>{aluno.nome}</h2>
                            <p><strong>Curso:</strong> {aluno.curso}</p>
                        </div>
                    </div>
                    <div className="painel-saldo">
                        <h3>Coins Disponíveis</h3>
                        <p>$ {aluno.saldo.toFixed(2)}</p>
                    </div>
                </div>

                {/* Botão de Dark Mode */}
                <div className="dark-mode-toggle-container">
                    <button onClick={toggleDarkMode} className="dark-mode-button">
                        {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Noturno'}
                    </button>
                </div>


                {/* NOTAS */}
                <div className="painel-notas">
                    <h3>Notas</h3>
                    <div className="notas-grid">
                        {aluno.notas.map((item, index) => (
                            <div className="card-nota" key={index}>
                                <p>{item.disciplina}</p>
                                <span>{item.nota}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COLUNAS EXTRAS */}
                <div className="painel-colunas">
                    {/* Informações Pessoais */}
                    <div className="painel-box">
                        <h3>Informações Pessoais</h3>
                        <p><strong>Matrícula:</strong> {aluno.dadosPessoais.matricula}</p>
                        <p><strong>Email:</strong> {aluno.dadosPessoais.email}</p>
                        <p><strong>Turma:</strong> {aluno.dadosPessoais.turma}</p>
                    </div>

                    {/* Atividades */}
                    <div className="painel-box">
                        <h3>Últimas Atividades</h3>
                        <ul>
                            {aluno.atividades.map((item, index) => (
                                <li key={index}>🟢 {item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Metas */}
                    <div className="painel-box">
                        <h3>Metas Atuais</h3>
                        <ul>
                            {aluno.metas.map((item, index) => (
                                <li key={index}>🎯 {item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Ranking */}
                    <div className="painel-box">
                        <h3>Ranking</h3>
                        <p>🏆 {aluno.ranking.posicao}º lugar de {aluno.ranking.total} alunos</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
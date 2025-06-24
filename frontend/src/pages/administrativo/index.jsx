import './style.css';
import { Link } from 'react-router-dom'; // 'useNavigate' não está sendo usado, podemos remover.

// Melhoria: Extrair os links para um array. Isso torna mais fácil adicionar ou remover itens.
const adminLinks = [
    { to: '/criarAluno', text: 'Cadastrar Aluno' },
    { to: '/criarAdministrativo', text: 'Cadastrar Administrativo' },
    { to: '/criarCurso', text: 'Cadastrar Curso' },
    { to: '/criarEmpresa', text: 'Cadastrar Empresa' },
];

export default function PaginaAdministrativo() {
    return (
        <div className="admin-page-container"> {/* Renomeei a classe para ser mais concisa */}
            <div className="admin-content-wrapper"> {/* Renomeei a classe */}
                <h1>Seja bem-vindo!</h1> {/* Adicionei um ponto de exclamação para ser mais amigável */}
                <p>O que você deseja fazer?</p>
                <ul className="admin-nav-list"> {/* Adicionei uma classe para a lista de navegação */}
                    {adminLinks.map((link, index) => (
                        <li key={index} className="admin-nav-item"> {/* Adicionei classes e uma chave única */}
                            <Link to={link.to}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
import './style.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useEffect for managing message display

// Import your assets
import play from '../../assets/Play5.png';
import pacote from '../../assets/pacotes.jpg';
import git from '../../assets/gift_card.png';
import fone from '../../assets/headset.png';
import icone from '../../assets/icone_perfil.png';

export default function Inicio_alunos() {
    const [saldo, setSaldo] = useState(100000);
    // State to manage feedback message
    const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success' or 'error'

    // Define product data
    const products = [
        { id: 1, name: 'Playstation 5', cost: 90000, image: play },
        { id: 2, name: 'Caixa Misteriosa', cost: 5000, image: pacote },
        { id: 3, name: 'Gift Card: R$30,00', cost: 10000, image: git },
        { id: 4, name: 'Headset', cost: 30000, image: fone },
        { id: 5, name: 'Playstation 5', cost: 90000, image: play },
        { id: 6, name: 'Caixa Misteriosa', cost: 5000, image: pacote },
        { id: 7, name: 'Gift Card: R$30,00', cost: 10000, image: git },
        { id: 8, name: 'Headset', cost: 30000, image: fone }
    ];

    // Function to handle the "TROCAR" button click
    const handleTrocar = (productName, cost) => {
        if (saldo >= cost) {
            setSaldo(prevSaldo => prevSaldo - cost);
            setMessage({ text: `Parabéns! Você trocou por ${productName}.`, type: 'success' });
        } else {
            setMessage({ text: `Pontos insuficientes para ${productName}.`, type: 'error' });
        }
    };

    // Effect to clear the message after some time
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 3000); // Message disappears after 3 seconds
            return () => clearTimeout(timer); // Cleanup timer if component unmounts or message changes
        }
    }, [message]); // Re-run effect when message state changes

    return (
        <>
            <div className='alunos'>
                <div className='menu-alunos'>
                    <div className='alunos-esquerda'>
                    <Link to='/'><h1 className="brand">EDU PREMIA</h1></Link>
                    </div>
                    <div className='alunos-direita'>
                        <Link to='/AlunoPerfil'><img src={icone} alt="Ícone de Perfil" /></Link>
                        <h3>Olá: Matheus</h3>
                        <p>Seu saldo é: <span className="saldo-value">${saldo.toLocaleString('pt-BR')}</span></p>
                    </div>
                </div>

                {/* Feedback Message Display */}
                {message.text && (
                    <div className={`feedback-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <h1 className='subtitle-alunos'>O que deseja trocar?</h1>

                <div className='fundo-troca-produtos'>
                    {products.slice(0, 4).map((product, index) => (
                        <div
                            className='troca-produtos'
                            key={product.id}
                            style={{ '--animation-delay': `${index * 0.15}s` }}
                        >
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>COINS: <span className={saldo < product.cost ? 'insufficient-points' : ''}>${product.cost.toLocaleString('pt-BR')}</span></p>
                            <button
                                onClick={() => handleTrocar(product.name, product.cost)}
                                disabled={saldo < product.cost} // Disable button if insufficient funds
                                className={saldo < product.cost ? 'disabled-button' : ''} // Add class for styling
                            >
                                TROCAR
                            </button>
                        </div>
                    ))}
                </div>

                <div className='fundo-troca-produtos second-row'>
                    {products.slice(4, 8).map((product, index) => (
                        <div
                            className='troca-produtos'
                            key={product.id}
                            style={{ '--animation-delay': `${(index + 4) * 0.15}s` }}
                        >
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>COINS: <span className={saldo < product.cost ? 'insufficient-points' : ''}>${product.cost.toLocaleString('pt-BR')}</span></p>
                            <button
                                onClick={() => handleTrocar(product.name, product.cost)}
                                disabled={saldo < product.cost}
                                className={saldo < product.cost ? 'disabled-button' : ''}
                            >
                                TROCAR
                            </button>
                        </div>
                    ))}
                </div>

                <div className='footer-alunos'>
                    <h1>EDU PREMIA - SEJA RECOMPENSADO PELO SEU ESFORÇO !!!</h1>
                </div>
            </div>
        </>
    );
}
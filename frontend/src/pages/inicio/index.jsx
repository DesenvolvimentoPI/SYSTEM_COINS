import './style.css';
import Playstation from '../../assets/Play5.png';
import Caixas from '../../assets/pacotes.jpg';
import Cards from '../../assets/gift_card.png';
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';


export default function Inicio() {
    return (
        <>
            <div className='container-principal'>
            <header className="header">
                <div className="inner-header">
                <h2 className="brand">Edu Premia</h2>
                <nav className="navbar">
                    <ul>
                        <li><Link to='/tipo'>Login</Link></li>
                        <a href="">Contato</a>
                    </ul>
                </nav>
                </div>
                <div className="banner active">
                    <span className="square"></span>            
                    <h2>Seja o melhor aluno, e ganhe prémios!</h2>
                    <p>Conquiste o sucesso acadêmico e seja recompensado! Se esforce, aprenda e destaque-se para alcançar seus objetivos e ganhar prêmios incríveis. Seu futuro começa agora!
                    </p>
                </div>
            </header>
            <main className="expertise-areas">
                <div className="expertise-information">
                    <h3 className="section-title">O que você pode ganhar?</h3>
                    <p className="section-subtitle">Veja abaixo uma lista de premios disponiveis para você trocar!</p>
                </div>
                <div className="other-services">
                    <div className="service">
                        <div className="service-info">
                        <h4>Eletronicos</h4>
                        <img src={Playstation} alt="VideoGame" />
                        <p>Seja o melhor aluno para ter a chance de trocar seus pontos por eletronicos!</p>
                    </div>
                </div>
                <div className="service">
                    <div className="service-info">
                        <h4>Caixas Surpresas</h4>
                        <img src={Caixas} alt="Caixas" />
                        <p>Quer saber o que te espera? Nossas Caixas Surpresas estão recheadas de coisas incríveis para você que se dedica aos estudos!</p>
                    </div>
                </div>            
                <div className="service">
                    <div className="service-info">
                        <h4>Empresas e funcionários</h4>
                        <img src={Cards} alt="Gift card" />
                        <p>Imagine a liberdade de escolher o que você realmente quer! Com nossos Gift Cards, a recompensa está nas suas mãos.</p>
                    </div>
                </div>
                </div>
            </main>
            <section className="team">
                <h2>
                O <span>Edu Premia</span> quer motivar você a ser um melhor aluno!
                </h2>
                <p>Venha fazer parte do nosso time!</p>
            </section>
      <footer className="footer">
        <div className="contact-info">
          <div className="footer-brand">
            <h2>Edu Premia</h2>
            <p>Motivando você a ser o melhor aluno!</p>
          </div>
          <p><i className="bi bi-geo-alt"></i> Av Brasil, 1415 - Campinas</p>
          <p><i className="bi bi-telephone"></i> (19) 9949-3509</p>
          <p><i className="bi bi-envelope"></i> contato@edupremia.com</p>
        </div>
        <div className="links-container">
          <h4>Saiba mais sobre nossos serviços</h4>
          <div className="phone-number">
            <i className="bi bi-telephone"></i>
            <p>(99) 9999-9999</p>
          </div>
          <p className="phone-info">
            Este telefone é especial para tratar sobre parcerias e negocios
          </p>
            </div>
                </footer>
            </div>
        </>
    )
}
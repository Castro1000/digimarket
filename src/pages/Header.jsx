import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  const sair = () => {
    localStorage.removeItem('usuarioLogado')
    window.location.href = '/login'
  }

  return (
    usuario && (
      <header className="header">
        <div className="header-container">
          <div className="grupo-esquerdo">
            <div className="logo">
              <img src="/logo.png" alt="Logo DigiMarket" />
            </div>

            <nav className="menu">
              <a href="/">Início</a>
              {usuario?.tipo === 'usuario' && <a href="/meus-pedidos">Meus Pedidos</a>}
              {usuario?.tipo === 'vendedor' && (
                <>
                  <a href="/meus-produtos">Meus Produtos</a>
                  <a href="/cadastrar-produto">Cadastrar Produto</a>
                </>
              )}
              {usuario?.tipo === 'admin' && <a href="/cadastro">Cadastrar Usuário</a>}
            </nav>
          </div>

          <span className="sair" onClick={sair}>Sair</span>
        </div>
      </header>
    )
  )
}

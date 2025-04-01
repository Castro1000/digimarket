import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import ProdutoDetalhe from './pages/ProdutoDetalhe'
import CadastroProduto from './pages/CadastroProduto'
import MeusPedidos from './pages/MeusPedidos'
import MeusProdutos from './pages/MeusProdutos'
import CadastroUsuarioAdmin from './pages/CadastroUsuarioAdmin'
import Header from './pages/Header'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const rotasSemHeader = ['/login', '/cadastro']

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado')
    const rotaAtual = window.location.pathname
    const rotaPublica = rotaAtual === '/login' || rotaAtual === '/cadastro'

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    } else if (!rotaPublica) {
      navigate('/login')
    }
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado')
    setUsuario(null)
    navigate('/login')
  }

  return (
    <>
      {!rotasSemHeader.includes(location.pathname) && usuario && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/cadastro"
          element={
            usuario && usuario.tipo === 'admin'
              ? <CadastroUsuarioAdmin />
              : <Cadastro />
          }
        />

        <Route path="/produto/:id" element={<ProdutoDetalhe />} />
        <Route path="/cadastrar-produto" element={<CadastroProduto />} />
        <Route path="/meus-pedidos" element={<MeusPedidos />} />
        <Route path="/meus-produtos" element={<MeusProdutos />} />
      </Routes>
    </>
  )
}

export default App

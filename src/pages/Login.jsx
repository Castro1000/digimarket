// Tela de login com logo e estilo aprimorado
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const admin = localStorage.getItem('adminUser')
    if (!admin) {
      const userAdmin = {
        nome: 'Administrador',
        email: 'admin@digimarket.com',
        senha: 'admin123',
        tipo: 'admin'
      }
      localStorage.setItem('adminUser', JSON.stringify(userAdmin))
    }
  }, [])

  const handleLogin = () => {
    const adminUser = JSON.parse(localStorage.getItem('adminUser'))
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    if (email === adminUser.email && senha === adminUser.senha) {
      localStorage.setItem('usuarioLogado', JSON.stringify(adminUser))
      alert('Login como administrador!')
      navigate('/')
      return
    }

    if (usuarioLogado && email === usuarioLogado.email && senha === usuarioLogado.senha) {
      alert(`Login como ${usuarioLogado.tipo}`)
      navigate('/')
      return
    }

    const listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados')) || []
    const usuarioEncontrado = listaUsuarios.find(
      (u) => u.email === email && u.senha === senha
    )

    if (usuarioEncontrado) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado))
      alert(`Login como ${usuarioEncontrado.tipo}`)
      navigate('/')
      return
    }

    alert('Usuário ou senha incorretos.')
  }

  return (
    <div className="login-container">
      <img src="/logo.png" alt="DigiMarket Logo" className="login-logo" />
      
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
      <p className="login-link">
        Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  )
}

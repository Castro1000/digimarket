import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      alert('Preencha todos os campos.')
      return
    }

    const novoUsuario = {
      nome,
      email,
      senha,
      tipo: 'usuario' // todos que se cadastram por aqui são 'usuario'
    }

    // Adiciona o usuário à lista geral de usuários
    const listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados')) || []
    listaUsuarios.push(novoUsuario)
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))

    // Loga o usuário automaticamente
    localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario))
    alert('Cadastro realizado com sucesso! Você está logado como usuário comum.')
    window.location.href = '/'
  }

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
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
      <button onClick={handleCadastro}>Cadastrar</button>
    </div>
  )
}

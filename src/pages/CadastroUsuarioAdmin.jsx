import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CadastroUsuarioAdmin() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('usuario')
  const [loja, setLoja] = useState('')
  const navigate = useNavigate()

  const handleCadastro = () => {
    if (!nome || !email || !senha || (tipo === 'vendedor' && !loja)) {
      alert('Preencha todos os campos.')
      return
    }

    const novoUsuario = {
      nome,
      email,
      senha,
      tipo,
      loja: tipo === 'vendedor' ? loja : ''
    }

    const listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados')) || []
    listaUsuarios.push(novoUsuario)
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))

    alert(`Usuário cadastrado como ${tipo} com sucesso!`)
    navigate('/')
  }

  return (
    <div className="container">
      <h2>Cadastrar Novo Usuário</h2>
      <input
        type="text"
        placeholder="Nome do Usuário"
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

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="usuario">Usuário Comum</option>
        <option value="vendedor">Vendedor</option>
        <option value="admin">Administrador</option>
      </select>

      {tipo === 'vendedor' && (
        <input
          type="text"
          placeholder="Nome da Loja"
          value={loja}
          onChange={(e) => setLoja(e.target.value)}
        />
      )}

      <button onClick={handleCadastro}>Cadastrar Usuário</button>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CadastroProduto() {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const navigate = useNavigate()

  const handleCadastro = () => {
    if (!titulo || !descricao || !preco) {
      alert('Preencha todos os campos.')
      return
    }

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    if (!usuario || (usuario.tipo !== 'vendedor' && usuario.tipo !== 'admin')) {
      alert('Apenas vendedores ou administradores podem cadastrar produtos.')
      return
    }

    const novoProduto = {
      id: Date.now(),
      titulo,
      descricao,
      preco,
      vendedor: usuario.loja || usuario.nome
    }

    const lista = JSON.parse(localStorage.getItem('produtos')) || []
    lista.push(novoProduto)
    localStorage.setItem('produtos', JSON.stringify(lista))

    alert('Produto cadastrado com sucesso!')
    navigate('/meus-produtos')
  }

  return (
    <div className="container">
      <h2>Cadastrar Produto</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />
      <button onClick={handleCadastro}>Salvar Produto</button>
    </div>
  )
}

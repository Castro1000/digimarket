import { useEffect, useState } from 'react'

export default function MeusProdutos() {
  const [meusProdutos, setMeusProdutos] = useState([])

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    const todos = JSON.parse(localStorage.getItem('produtos')) || []

    if (usuario) {
      const identificador = usuario.loja || usuario.email
      const filtrados = todos.filter(p => p.vendedor === identificador)
      setMeusProdutos(filtrados)
    }
  }, [])

  return (
    <div className="container">
      <h2>Meus Produtos</h2>
      {meusProdutos.length === 0 ? (
        <p>Você ainda não cadastrou nenhum produto.</p>
      ) : (
        <ul>
          {meusProdutos.map(prod => (
            <li key={prod.id}>
              <strong>{prod.titulo}</strong><br />
              {prod.descricao}<br />
              Preço: R$ {prod.preco}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

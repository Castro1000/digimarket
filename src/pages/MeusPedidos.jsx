import { useEffect, useState } from 'react'

export default function MeusPedidos() {
  const [meusPedidos, setMeusPedidos] = useState([])

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    const todasCompras = JSON.parse(localStorage.getItem('compras')) || []

    if (usuario) {
      const comprasDoUsuario = todasCompras.filter(
        (c) => c.email === usuario.email
      )
      setMeusPedidos(comprasDoUsuario)
    }
  }, [])

  return (
    <div className="container">
      <h2>Meus Pedidos</h2>

      {meusPedidos.length === 0 ? (
        <p>Você ainda não realizou nenhuma compra.</p>
      ) : (
        <ul>
          {meusPedidos.map((pedido, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <strong>{pedido.nome}</strong><br />
              Preço: {pedido.preco}<br />
              Data da compra: {pedido.data}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'

export default function ProdutoDetalhe() {
  const produto = {
    id: 1,
    nome: 'Curso de React',
    descricao: 'Aprenda React do zero com exemplos práticos e projetos.',
    preco: 'R$ 79,90',
    arquivo: 'resumo-da-compra.txt'
  }

  const [comprado, setComprado] = useState(false)
  const [baixando, setBaixando] = useState(false)
  const [baixado, setBaixado] = useState(false)

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    const compras = JSON.parse(localStorage.getItem('compras')) || []
    const jaComprado = compras.some(
      (p) => p.id === produto.id && p.email === usuario?.email
    )
    setComprado(jaComprado)
  }, [])

  const comprarProduto = () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    if (!usuario) {
      alert('Você precisa estar logado para comprar.')
      return
    }

    const compras = JSON.parse(localStorage.getItem('compras')) || []

    compras.push({
      id: produto.id,
      nome: produto.nome,
      data: new Date().toLocaleDateString('pt-BR'),
      preco: produto.preco,
      email: usuario.email
    })

    localStorage.setItem('compras', JSON.stringify(compras))
    setComprado(true)
    alert('Compra realizada com sucesso!')
  }

  const baixarArquivo = () => {
    const conteudo = `
Resumo da Compra - DigiMarket

Produto: ${produto.nome}
Descrição: ${produto.descricao}
Preço: ${produto.preco}
Data: ${new Date().toLocaleDateString('pt-BR')}
    `.trim()

    const blob = new Blob([conteudo], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = produto.arquivo
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    setBaixando(true)
    setTimeout(() => {
      setBaixando(false)
      setBaixado(true)
      URL.revokeObjectURL(url)
    }, 3000)
  }

  return (
    <div className="container">
      <h2>{produto.nome}</h2>
      <p>{produto.descricao}</p>
      <p><strong>Preço:</strong> {produto.preco}</p>

      {!comprado ? (
        <button onClick={comprarProduto}>Comprar Agora</button>
      ) : baixando ? (
        <p>📦 Baixando arquivo...</p>
      ) : baixado ? (
        <p>✅ Arquivo baixado com sucesso!</p>
      ) : (
        <button onClick={baixarArquivo}>Baixar Arquivo</button>
      )}
    </div>
  )
}

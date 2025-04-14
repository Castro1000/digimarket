import { useEffect, useState } from 'react'
import './Home.css'

export default function Home() {
  const [produtos, setProdutos] = useState([])
  const [compras, setCompras] = useState([])
  const [baixandoId, setBaixandoId] = useState(null)
  const [baixadoId, setBaixadoId] = useState(null)
  const [pagandoId, setPagandoId] = useState(null)
  const [finalizadoId, setFinalizadoId] = useState(null)
  const [selecionandoForma, setSelecionandoForma] = useState(null)
  const [formaSelecionadaId, setFormaSelecionadaId] = useState(null)
  const [mostrarCartaoId, setMostrarCartaoId] = useState(null)
  const [dadosCartao, setDadosCartao] = useState({ nome: '', numero: '', validade: '', cvv: '' })
  const [boletoAguardandoIds, setBoletoAguardandoIds] = useState([])
  const [busca, setBusca] = useState('')
  const [precoMin, setPrecoMin] = useState('')
  const [precoMax, setPrecoMax] = useState('')

  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtos'))
    if (!produtosSalvos || produtosSalvos.length < 10) {
      const produtosPadrao = [
        { id: 1, titulo: "Curso de JavaScript", descricao: "Aprenda JavaScript do zero.", preco: "59.90", vendedor: "Loja ProCursos" },
        { id: 2, titulo: "Template Portfólio", descricao: "Modelo para site pessoal.", preco: "29.90", vendedor: "WebDesigners Pro" },
        { id: 3, titulo: "E-book Marketing", descricao: "Dicas de marketing digital.", preco: "19.90", vendedor: "DigitalBooks" },
        { id: 4, titulo: "Curso de Python", descricao: "Aprenda Python na prática.", preco: "69.90", vendedor: "Loja ProCursos" },
        { id: 5, titulo: "Apostila ENEM 2024", descricao: "Material completo para o ENEM.", preco: "14.90", vendedor: "Educa+" },
        { id: 6, titulo: "Ícones SVG", descricao: "Pacote com 500 ícones vetoriais.", preco: "9.90", vendedor: "DesignAssets" },
        { id: 7, titulo: "Modelo Currículo", descricao: "Currículo moderno e pronto.", preco: "4.90", vendedor: "Documentos Express" },
        { id: 8, titulo: "Curso de Excel", descricao: "Domine o Excel básico.", preco: "34.90", vendedor: "Planilhas Pro" },
        { id: 9, titulo: "Kit Instagram", descricao: "Templates prontos para redes sociais.", preco: "22.90", vendedor: "SocialMedia Tools" },
        { id: 10, titulo: "Plugin WordPress", descricao: "Plugin de SEO para WP.", preco: "39.90", vendedor: "WPPro Plugins" }
      ]
      localStorage.setItem('produtos', JSON.stringify(produtosPadrao))
      setProdutos(produtosPadrao)
    } else {
      setProdutos(produtosSalvos.reverse())
    }

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    const listaCompras = JSON.parse(localStorage.getItem('compras')) || []
    const minhasCompras = listaCompras.filter(c => c.email === usuario?.email)
    setCompras(minhasCompras)
  }, [])

  const iniciarCompra = (produto) => {
    setSelecionandoForma(produto.id)
    setFormaSelecionadaId(null)
  }

  const escolherFormaPagamento = (produto, forma) => {
    setFormaSelecionadaId(produto.id)
    if (forma === 'Pix') setPagandoId(produto.id)
    else if (forma === 'Boleto') {
      alert('Boleto enviado para seu e-mail cadastrado.')
      setBoletoAguardandoIds([...boletoAguardandoIds, produto.id])
      setFinalizadoId(produto.id)
    } else if (forma === 'Cartão') setMostrarCartaoId(produto.id)
  }

  const confirmarPagamentoPix = (produto) => {
    registrarCompra(produto, 'Pix')
    setPagandoId(null)
    setFinalizadoId(produto.id)
  }

  const registrarCompra = (produto, forma) => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    const novaCompra = {
      id: produto.id,
      nome: produto.titulo,
      preco: produto.preco,
      data: new Date().toLocaleDateString('pt-BR'),
      email: usuario.email,
      formaPagamento: forma
    }

    const atual = JSON.parse(localStorage.getItem('compras')) || []
    localStorage.setItem('compras', JSON.stringify([...atual, novaCompra]))
    setCompras([...compras, novaCompra])
  }

  const finalizarCartao = (produto) => {
    setMostrarCartaoId(null)
    registrarCompra(produto, 'Cartão')
    setFinalizadoId(produto.id)
  }

  const voltarPagina = () => window.location.reload()

  const produtosFiltrados = produtos.filter((p) => {
    const preco = parseFloat(p.preco)
    const tituloMatch = p.titulo.toLowerCase().includes(busca.toLowerCase())
    const precoMinOk = !precoMin || preco >= parseFloat(precoMin)
    const precoMaxOk = !precoMax || preco <= parseFloat(precoMax)
    return tituloMatch && precoMinOk && precoMaxOk
  })

  return (
    <div className="container">
      <h2 className="titulo">🛒 Produtos em Destaque</h2>

      <div className="filtros">
        <input
          type="text"
          placeholder="🔍 Buscar por título"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <div className="filtros-preco">
          <input
            type="number"
            placeholder="Preço Mínimo"
            value={precoMin}
            onChange={e => setPrecoMin(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço Máximo"
            value={precoMax}
            onChange={e => setPrecoMax(e.target.value)}
          />
        </div>
      </div>

      <div className="grade-produtos">
        {produtosFiltrados.map((p) => (
          <div key={p.id} className="produto-card">
            <h3>{p.titulo}</h3>
            <p className="descricao">{p.descricao}</p>
            <p className="preco">R$ {p.preco}</p>
            <p className="loja">Loja: {p.vendedor}</p>
            <button className="btn-comprar" onClick={() => iniciarCompra(p)}>🛒 Comprar</button>
          </div>
        ))}
      </div>
    </div>
  )
}

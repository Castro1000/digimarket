import { useEffect, useState } from 'react'
import './Home.css'

export default function Home() {
  const [produtos, setProdutos] = useState([])
  const [compras, setCompras] = useState([])
  const [pagandoId, setPagandoId] = useState(null)
  const [selecionandoForma, setSelecionandoForma] = useState(null)
  const [formaSelecionadaId, setFormaSelecionadaId] = useState(null)
  const [mostrarCartaoId, setMostrarCartaoId] = useState(null)
  const [dadosCartao, setDadosCartao] = useState({ nome: '', numero: '', validade: '', cvv: '' })
  const [boletoAguardandoIds, setBoletoAguardandoIds] = useState([])
  const [modalSucesso, setModalSucesso] = useState(false)

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
      setProdutos(produtosSalvos)
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
    if (forma === 'Pix') {
      setPagandoId(produto.id)
    } else if (forma === 'Boleto') {
      alert('Boleto enviado para seu e-mail cadastrado.')
      setBoletoAguardandoIds([...boletoAguardandoIds, produto.id])
      registrarCompra(produto, 'Boleto')
      setModalSucesso(true)
    } else if (forma === 'Cartão') {
      setMostrarCartaoId(produto.id)
    }
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
  }

  const confirmarPagamentoPix = (produto) => {
    registrarCompra(produto, 'Pix')
    setPagandoId(null)
    setModalSucesso(true)
  }

  const finalizarCartao = (produto) => {
    registrarCompra(produto, 'Cartão')
    setMostrarCartaoId(null)
    setModalSucesso(true)
  }

  const voltarPagina = () => {
    window.location.reload()
  }

  return (
    <div className="container">
      <h2 className="titulo">🛒 Produtos em Destaque</h2>
      <div className="grade-produtos">
        {produtos.map((p) => (
          <div key={p.id} className="produto-card">
            <h3>{p.titulo}</h3>
            <p className="descricao">{p.descricao}</p>
            <p className="preco">R$ {p.preco}</p>
            <p className="loja">Loja: {p.vendedor}</p>

            {selecionandoForma === p.id && !formaSelecionadaId && (
              <div className="pagamento">
                <p><strong>Forma de pagamento:</strong></p>
                <button onClick={() => escolherFormaPagamento(p, 'Cartão')}>💳 Cartão</button>
                <button onClick={() => escolherFormaPagamento(p, 'Pix')}>📱 Pix</button>
                <button onClick={() => escolherFormaPagamento(p, 'Boleto')}>📄 Boleto</button>
                <button onClick={voltarPagina}>🔙 Voltar</button>
              </div>
            )}

            {formaSelecionadaId === p.id && pagandoId === p.id && (
              <div className="pix-box">
                <p><strong>Escaneie o QR Code:</strong></p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PIX1234567890" alt="QR Code Pix" /><br />
                <p>Chave Pix: PIX1234567890</p>
                <button onClick={() => confirmarPagamentoPix(p)}>✅ Confirmar pagamento</button>
                <button onClick={voltarPagina}>🔙 Voltar</button>
              </div>
            )}

            {mostrarCartaoId === p.id && (
              <div className="modal-cartao">
                <h3>Pagamento com Cartão</h3>
                <input placeholder="Nome no Cartão" value={dadosCartao.nome} onChange={e => setDadosCartao({ ...dadosCartao, nome: e.target.value })} />
                <input placeholder="Número" value={dadosCartao.numero} onChange={e => setDadosCartao({ ...dadosCartao, numero: e.target.value })} />
                <input placeholder="Validade (MM/AA)" value={dadosCartao.validade} onChange={e => setDadosCartao({ ...dadosCartao, validade: e.target.value })} />
                <input placeholder="CVV" value={dadosCartao.cvv} onChange={e => setDadosCartao({ ...dadosCartao, cvv: e.target.value })} />
                <button onClick={() => finalizarCartao(p)}>Finalizar Pagamento</button>
                <button onClick={voltarPagina}>🔙 Voltar</button>
              </div>
            )}

            {!formaSelecionadaId && (
              <button className="btn-comprar" onClick={() => iniciarCompra(p)}>🛒 Comprar</button>
            )}
          </div>
        ))}
      </div>

      {modalSucesso && (
        <div className="modal-overlay">
          <div className="modal-box animate">
            <h3>🎉 Parabéns pela compra!</h3>
            <p>Assim que confirmado o pagamento,<br />o arquivo será enviado para seu e-mail cadastrado.</p>
            <button onClick={voltarPagina}>OK</button>
          </div>
        </div>
      )}
    </div>
  )
}

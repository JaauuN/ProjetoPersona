import React, { useState, useEffect } from 'react'
import MenuItens from './components/Menu-itens'
import CarrinhoCompras from './components/CarrinhoCompras'
import BotaoCarrinhoNav from './components/BotaoCarrinhoNav'
import BotaoCarrinhoPagina from './components/BotaoCarrinhoPagina'
import ReactDOM from 'react-dom/client'
import { auth, db } from './firebase_conexo'
import { doc, getDoc } from 'firebase/firestore'

export default function Menu() {
  const [carrinho, setCarrinhocompras] = useState([])
  const [mostrarcarrinho, setMostrarcarrinho] = useState(false)




  const dadosMenu = {
    'Pratos Feitos': [
      { imagem: '/refeições/prato_bife.webp', descricao: 'ola', id: 1, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: 'ola', id: 2, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 3, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 4, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 5, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 6, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 7, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 8, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 9, nome: 'Frango Ao Molho', preco: 20 },
    ],
    'Carnes': [
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 10, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 11, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 12, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 13, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 14, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 15, nome: 'Frango Ao Molho', preco: 20 },
    ],
    'Frituras': [
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 16, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 17, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 18, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 19, nome: 'Frango Ao Molho', preco: 20 },
    ],
    'Bebidas': [
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 20, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 21, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 22, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 23, nome: 'Frango Ao Molho', preco: 20 },
      ],
      'Sobremesas': [
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 24, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 25, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 26, nome: 'Frango Ao Molho', preco: 20 },
      { imagem: '/refeições/prato_bife.webp', descricao: '', id: 27, nome: 'Frango Ao Molho', preco: 20 },
      ],
  };

  // O que o .map() faz. Ele percorre todos elementos de um array e recria ele como um novo array com o resultado da função aplicada Ex: setCarrinhocompras(itematual => {})
  //A => serve como uma função simplificada
  function adicionarItem(item) {
    setCarrinhocompras(itematual => {
      const itemexiste = itematual.find(itens => itens.id === item.id);
      if (itemexiste) {
        return itematual.map(itens => itens.id === item.id ? { ...itens, quantidade: itens.quantidade + 1 } : itens);
      } else {
        return [...itematual, { ...item, quantidade: 1 }];
      }
    });
  }
  function removerItem(item) {
    setCarrinhocompras(itematual => {
      const itemexiste = itematual.find(itens => itens.id === item.id);
      if (itemexiste) {
        return itematual.map(itens => itens.id === item.id ? { ...itens, quantidade: itens.quantidade - 1 } : itens).filter(itens => itens.quantidade > 0)
      }
    });
  }

  function toggleCarrinho() {
    setMostrarcarrinho(mostrar => !mostrar);
  }

  async function fecharPedido() {
    const usuario = auth.currentUser
    if (carrinho.length === 0) {
      return
    }
    if (!usuario) {
      alert("Faça login!")
      return
    }
      
    const docRef = doc(db, 'usuarios', usuario.uid)
    const docSnap = await getDoc(docRef)
    let nome = ''
    let endereco = ''
    if (docSnap.exists()) {
      const dados = docSnap.data()
      nome = dados.nome
      endereco = dados.endereco
    }

    const numerozap = "85991591674"
    let mensagemzap = `Meu nome é: ${nome}\n`
    mensagemzap += `Gostaria de pedir os seguintes itens:\n`
    let total = 0

    for (let i = 0; i < carrinho.length; i++) {
      let item = carrinho[i]
      mensagemzap += `• ${item.nome} (x${item.quantidade}) - R$${(item.preco * item.quantidade)}\n`
      total += item.preco * item.quantidade
    }
    mensagemzap += `Total: R$${total}\n`
    mensagemzap += `Endereço de entrega\n\n`
    mensagemzap += `${endereco}`
    const link = `https://wa.me/${numerozap}?text=${encodeURIComponent(mensagemzap)}`
    window.open(link, "_blank")
    setCarrinhocompras([])

  }

  // Referencia para usar o botao mostrar-carrinho em qualquer lugar do codigo usando portal do react: https://react.dev/reference/react-dom/createPortal
  useEffect(() => {
    const Botaonav = document.getElementById('botao-carrinho-barranav');
    const Botaopagina = document.getElementById('botao-carrinho-pagina');

    if (Botaonav) {
      const portalnav = ReactDOM.createRoot(Botaonav);
      portalnav.render(<BotaoCarrinhoNav toggleCarrinho={toggleCarrinho} />);
    }

    if (Botaopagina) {
      const portalpagina = ReactDOM.createRoot(Botaopagina);
      portalpagina.render(<BotaoCarrinhoPagina toggleCarrinho={toggleCarrinho} />);
    }
  }, []);

  return (
    <div>
      <MenuItens dadosMenu={dadosMenu} onAdicionar={adicionarItem} />

      <CarrinhoCompras
        carrinho={carrinho}
        mostrar={mostrarcarrinho}
        Fecharmenu={() => setMostrarcarrinho(false)}
        adicionaritem={adicionarItem}
        removeritem={removerItem}
        Fecharpedido={fecharPedido}
      />
    </div>
  );
}
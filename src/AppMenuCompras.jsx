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
    'Pratos Regionais': [
      { imagem: '/refeições/galinha-caipira.webp', descricao: 'Acompanha Arroz Branco, Cuscuz, Pirão e Macaxeira', id: 1, nome: 'Galinha Caipira', preco: 130 },
      { imagem: '/refeições/panelada.webp', descricao: 'Acompanha Arroz Branco, Cuscuz ou Pirão', id: 2, nome: 'Panelada', preco: 50 },
      { imagem: '/refeições/Buchada-panelada.webp', descricao: 'Acompanha Arroz Branco, Cuscuz ou Pirão', id: 3, nome: 'Buchada Panelada', preco: 50 },
      { imagem: '/refeições/fava.webp', descricao: 'Feito com Carne de Charque e Calabresa', id: 4, nome: 'Fava', preco: 25 },
      { imagem: '/refeições/feijão verde.webp', descricao: 'Feito com Queijo, Maxixe, Quiabo e Nata', id: 5, nome: 'Feijão Verde', preco: 22 },
      { imagem: '/refeições/feij.webp', descricao: 'Feito com Carne de Charque, Linguiça, Cuscuz e Feijão', id: 6, nome: 'Feijão Tropeiro', preco: 30 },
      { imagem: '/refeições/carneiro cozido.webp', descricao: 'Acompanha Arroz Branco, Cuscuz ou Pirão', id: 7, nome: 'Carneiro Cozido', preco: 20 },
      { imagem: '/refeições/sarapatel.webp', descricao: 'Acompanha Arroz Branco, Cuscuz e Cheiro Verde', id: 8, nome: 'Sarapatel de Carneiro', preco: 20 },
      { imagem: '/refeições/sarrabulho.webp', descricao: 'Acompanha Arroz Branco, Cuscuz e Cheiro Verde', id: 9, nome: 'Sarrabulho', preco: 20 },
    ],
    'Carnes': [
      { imagem: '/refeições/carne do sol-carneiro.jpg', descricao: '300gr / Acompanha Macaxeira, Batata Doce, Farofa e Vinagrete', id: 10, nome: 'Carne do Sol de Porco', preco: 70 },
      { imagem: '/refeições/carne do sol-carneiro.jpg', descricao: '300gr / Acompanha Macaxeira, Batata Doce, Farofa e Vinagrete', id: 11, nome: 'Carne do Sol de Gado', preco: 75 },
      { imagem: '/refeições/carne do sol-carneiro.jpg', descricao: '300gr / Acompanha Macaxeira, Batata Doce, Farofa e Vinagrete', id: 12, nome: 'Carne do Sol de Carneiro', preco: 75 },
    ],
    'Frituras': [
      { imagem: '/refeições/peixe tilapia.webp', descricao: 'Acompanha Baião e Farofa', id: 20, nome: 'Peixe Tilápia Frito', preco: 80 },
      { imagem: '/refeições/atum frito.webp', descricao: '400gr de Atum / Acompanha Baião, Farofa, Macaxeira', id: 21, nome: 'Atum Frito', preco: 65 },
      { imagem: '/refeições/cavala-frita.webp', descricao: '400gr de Cavala / Acompanha Baião, Farofa, Macaxeira', id: 22, nome: 'Cavala Frita', preco: 75 },
      { imagem: '/refeições/camarão.webp', descricao: '', id: 23, nome: 'Camarão Alho e Óleo', preco: 25 },
      { imagem: '/refeições/batata frita.webp', descricao: '', id: 28, nome: 'Batata Frita', preco: 20 },
      { imagem: '/refeições/torresmo.webp', descricao: '', id: 29, nome: 'Torremos c/ Farofa', preco: 16 },
      ],
    'Bebidas': [
      { imagem: '/refeições/agua.webp', descricao: '500ml', id: 16, nome: 'Água Mineral', preco: 3 },
      { imagem: '/refeições/agua de coco.jpg', descricao: 'Direto do Coco', id: 17, nome: 'Água de Coco Verde', preco: 6 },
      { imagem: '/refeições/agua de coco jarra.webp', descricao: 'Jarra de 1L', id: 18, nome: 'Água de Coco Jarra', preco: 10 },
      { imagem: '/refeições/refigerante-lata.webp', descricao: '350ml', id: 13, nome: 'Refrigerante Lata', preco: 5 },
      { imagem: '/refeições/refrigerante 1 litro.webp', descricao: '1L', id: 14, nome: 'Refrigerante 1 Litro', preco: 9 },
      { imagem: '/refeições/refrigerante 2litro.webp', descricao: '2L', id: 15, nome: 'Refrigerante 2 Litro', preco: 15 },
    ],
    
      'Sobremesas': [
      { imagem: '/refeições/mousse_diversos.jpg', descricao: 'Sabores Diversos', id: 24, nome: 'Mousse Diversos', preco: 7.50 },
      { imagem: '/refeições/pudim.webp', descricao: '', id: 25, nome: 'Pudim', preco: 7.50 },
      { imagem: '/refeições/picole.webp', descricao: 'Sabores Diversos', id: 26, nome: 'Picolé Diversos', preco: 7.50 },
      { imagem: '/refeições/Rapadura.webp', descricao: '', id: 27, nome: 'Rapadura', preco: 7.50 },
      ],
  };

  // O que o .map() faz. Ele percorre todos elementos de um array e recria ele como um novo array com o resultado da função aplicada Ex: setCarrinhocompras(itematual => {})
  //A => serve como uma função simplificada
  //https://stackoverflow.com/questions/68265664/need-to-add-quantity-on-my-react-state-object
  function adicionarItem(item) {
    setCarrinhocompras(itematual => {
      const itemexiste = itematual.find(itens => itens.id === item.id);

      if (itemexiste) {
        return itematual.map(itens => itens.id === item.id ? { ...itens, quantidade: itens.quantidade + 1 } : itens);
      } 
      else {
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

  // Redenrizo o BotaoCarrinho que esta tanto no barranav quanto na pagina para usar a função toggleCarrinho: https://react.dev/reference/react-dom/createPortal
  useEffect(() => {
      ReactDOM.createRoot(document.getElementById('botao-carrinho-barranav')).render(<BotaoCarrinhoNav toggleCarrinho={toggleCarrinho} />);
      ReactDOM.createRoot(document.getElementById('botao-carrinho-pagina')).render(<BotaoCarrinhoPagina toggleCarrinho={toggleCarrinho} />);
  }, []);

  return (
    <div>
      <MenuItens dadosMenu={dadosMenu} adicionaritem={adicionarItem} />

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
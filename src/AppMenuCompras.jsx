import React, { useState, useEffect } from 'react';
import MenuItens from './components/Menu-itens';
import CarrinhoCompras from './components/CarrinhoCompras';
import BotaoCarrinhoNav from './components/BotaoCarrinhoNav';
import BotaoCarrinhoPagina from './components/BotaoCarrinhoPagina'
import ReactDOM from 'react-dom/client';

export default function Menu() {
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  const dadosMenu = {
    'Pratos Feitos': [
      {imagem: '/refeições/prato_bife.webp' , descricao: 'ola',id:1, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: 'ola',id:2, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:3, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:4, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:5, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:6, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:7, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:11, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:12, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:13, nome:'Frango Ao Molho', preco:20 },
    ],
    'Carnes': [
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:15, nome:'Frango Ao Molho', preco:20 },
      { id:9, nome:'Filé', preco:30 },
    ],
    'Frituras': [
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:14, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:16, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:17, nome:'Frango Ao Molho', preco:20 },
      {imagem: '/refeições/prato_bife.webp' , descricao: '',id:18, nome:'Frango Ao Molho', preco:20 },
    ],
  };

  function adicionarAoCarrinho(item) {
    setCarrinho(prev => [...prev, item]);
  }

  function removeritemcarrinho(id) {
    setCarrinho(prev => {
        const index = prev.findIndex(item => item.id === id);
        if (index !== -1) {
            const novoCarrinho = [...prev];
            novoCarrinho.splice(index, 1);
            return novoCarrinho;
        }
        return prev;
    });
}

  
   function toggleCarrinho() {
    setMostrarCarrinho(mostrar => !mostrar);
  }

  {/*"Referencia para usar o botao mostrar-carrinho em qualquer lugar do codigo usando portal do react: https://react.dev/reference/react-dom/createPortal"*/}
   useEffect(() => {
    const Botaonav = document.getElementById('botao-carrinho-barranav');
    const Botaopagina = document.getElementById('botao-carrinho-pagina');

    if (Botaonav) {
      const portalnav = ReactDOM.createRoot(Botaonav);
      portalnav.render(<BotaoCarrinhoNav toggleCarrinho={toggleCarrinho}/>);
    }

    if (Botaopagina) {
      const  portalpagina = ReactDOM.createRoot(Botaopagina);
      portalpagina.render(<BotaoCarrinhoPagina toggleCarrinho={toggleCarrinho} />);
    }
  }, []);

  return (
    <div>
    
      <MenuItens dadosMenu={dadosMenu} onAdicionar={adicionarAoCarrinho} />

      <CarrinhoCompras
        carrinho={carrinho}
        mostrar={mostrarCarrinho}
        onFechar={() => setMostrarCarrinho(false)}
        onremoveritem={removeritemcarrinho}
      />
    </div>
  );
}
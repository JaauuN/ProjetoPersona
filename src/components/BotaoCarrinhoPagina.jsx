import React from 'react';


export default function BotaoCarrinhoPagina({ toggleCarrinho }) {
  return (
    <button onClick={toggleCarrinho} className="botao-carrinho-pagina">
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
      0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 
      14h9.74c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21.42 
      5H6.21l-.94-2H1v2h3l3.6 7.59-1.35 2.44C5.16 15.37 6.02 
      17 7.16 17H19v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L7.16 14z"/>
      </svg>
    </button>
  );
}
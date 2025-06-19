import React, { useState } from 'react'

export default function MenuLateral() {

  // Função que controla se o menu esta aberto (ele inicia fechado)
  const [menuaberto, menuAberto] = useState(false)

  // Função abre e fecha menu
  const toggleMenu = () => menuAberto(!menuaberto)

  return (
    <>
    
        {/* Botao do menu que esta no barra nav */}
        <button id="bt-Menu-Nav" onClick={toggleMenu}>
          <img src="img\menu.svg" height="50" width="50"/>
        </button>


      {/* Blur de fundo quando puxa a aba menu lateral */}
      <div
        className={`container-menu-lateral ${menuaberto ? 'ativo' : ''}`}
        onClick={() => menuAberto(false)} // fecha o menu se clicar fora
      ></div>

      {/* Menu lateral */}
      <div className={`menu-lateral ${menuaberto ? 'mover' : ''}`}>
        <header className='headerlateral'>
          {/* Botão dentro do menu para fechar */}
          <button id="bt-header-lateral" onClick={toggleMenu}>
            <img src="img/menu.svg" height="50" width="50" />
            </button>
        </header>
        <hr />
      </div>
    </>
  )
}
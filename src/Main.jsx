import React from 'react'
import ReactDOM from 'react-dom/client'
import MenuLateral from './components/Menu-Lateral'
import AppMenu from './AppMenuCompras'
import Login from './components/MetodoLoginFirebase'
import Registro from './components/MetodoRegistroFirebase'
import BotaoAutenticacao from './components/Botaologin'

ReactDOM.createRoot(document.getElementById('menu-lateral')).render(
  <React.StrictMode>
    <MenuLateral/>
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('AppMenu')).render(
  <React.StrictMode>
    <AppMenu/>
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('Login')).render(
  <React.StrictMode>
    <Login/>
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('Registro')).render(
 <React.StrictMode>
  <Registro/>
 </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('BotaoAutenticacao')).render(
  <React.StrictMode>
    <BotaoAutenticacao/>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import MenuLateral from './components/Menu-Lateral'
import AppMenu from './AppMenuCompras'
import Login from './components/MetodoLoginFirebase'
import Registro from './components/MetodoRegistroFirebase'
import Botaologin from './components/Botaologin'

ReactDOM.createRoot(document.getElementById('menu-lateral')).render(<MenuLateral/>)

ReactDOM.createRoot(document.getElementById('AppMenu')).render(<AppMenu/>)

ReactDOM.createRoot(document.getElementById('Login')).render(<Login/>)

ReactDOM.createRoot(document.getElementById('Registro')).render(<Registro/>)

ReactDOM.createRoot(document.getElementById('Botaologin')).render(<Botaologin/>)

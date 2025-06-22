import React, {useState} from 'react';
import {auth, db} from '../firebase_conexo';
import {signInWithEmailAndPassword} from 'firebase/auth';


//Site que me ajudou: https://firebase.google.com/docs/auth/web/start?hl=pt-br
export default function MetodoLoginFirebase() {
    const[numero,setNumero] = useState('');
    const[senha,setSenha] = useState('');

    function fazerlogin(e) {
        e.preventDefault()
        const emailfake = `${numero}@meusite.com`

        signInWithEmailAndPassword(auth, emailfake, senha)
        .then(() => {
            alert('Login feito!')
        })
        .catch(() => {
            alert('Email ou senha incorretas!')
        });
    }
    
    return (
        <div className='LoginUsuario'>
            <h2>Login</h2>
            <form onSubmit={fazerlogin}>
            <input type="tel" placeholder="Número de telefone"  value={numero} onChange={(e) => setNumero(e.target.value)} required/>
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
            <button type="submit">Entrar</button>
            </form>
        </div>
        
    );

}

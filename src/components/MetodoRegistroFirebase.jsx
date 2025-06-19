import React, { useState } from 'react';
import { auth, db } from '../firebase_conexo';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function MetodoRegistroFirebase() {
    const [numero, setNumero] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numerocasa, setNumerocasa] = useState('');

    async function fazerCadastro(e) {
        e.preventDefault();

        const emailfake = `${numero}@meusite.com`
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailfake, senha);
            const user = userCredential.user;

            // aqui eu junto todos os dados(rua,bairro e numerocasa) que foram passados no forms de registro e junto em um unico lugar
            const enderecoCompleto = `${rua}, nº ${numerocasa} - Bairro ${bairro}`;

            // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=pt-br
            await setDoc(doc(db, 'usuarios', user.uid), {
                nome,
                numero,
                endereco: enderecoCompleto
            });
            alert('Usuário cadastrado com sucesso!');
            console.log('Usuário:', user);
        } catch (error) {
            console.error('Erro ao cadastrar:', error.message);
            alert('Erro: ' + error.message);
        }
    }
    return (
        <div className='RegistroUsuario'>
            <h2>Registrar</h2>
            <form onSubmit={fazerCadastro}>
                <input type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} required/>
                <input type="text" placeholder='Numero de Telefone' value={numero} onChange={(e) => setNumero(e.target.value)} required/>
                <div className='EnderecoEstilo'>
                    <input type="text" placeholder='Rua' value={rua} onChange={(e) => setRua(e.target.value)} required/>
                    <input type="text" placeholder='Bairro' value={bairro} onChange={(e) => setBairro(e.target.value)} required/>
                    <input type="text" placeholder='Numero da Casa' value={numerocasa} onChange={(e) => setNumerocasa(e.target.value)} required/>
                </div>
                <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} required/>
                <button type="submit">Registrar</button>
            </form>
        </div>

    )


}
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
        // preventDefault previne o formulario de recarregar a pagina quando dou submit
        e.preventDefault();
        const emailfake = `${numero}@personamenu.com`
        // aqui eu junto todos os dados(rua,bairro e numerocasa) que foram passados no forms de registro e junto em um unico lugar
        const enderecoCompleto = `${rua}, nº ${numerocasa} - Bairro ${bairro}`;

        const userCredential = await createUserWithEmailAndPassword(auth, emailfake, senha);
        const usuario = userCredential.user;
        // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=pt-br
        await setDoc(doc(db, 'usuarios', usuario.uid), {
            nome,
            numero,
            endereco: enderecoCompleto
        });
        alert('Usuário cadastrado com sucesso!');
    }

    return (
        <div className='RegistroUsuario'>
            <h2>Registrar</h2>
            <form onSubmit={fazerCadastro}>
                {/*onChange serve para eu conseguir mudar os valores de dentro do input, porque estou usando os valores como useState */}
                {/*E sem utilizar o onChange o valor que esta dentro do useState vai ficar fixo no input e não vai ser possível fazer edição dos dados do input */}
                {/*Exemplo: se a constante[nome] estivesse com o useState('Joao') e eu não utilizasse o onChange o valor que esta no useState ficaria fixo */}
                <input type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} required />
                <input type="text" placeholder='Numero de Telefone' value={numero} onChange={(e) => setNumero(e.target.value)} required />
                <div className='EnderecoEstilo'>
                    <input type="text" placeholder='Rua' value={rua} onChange={(e) => setRua(e.target.value)} required />
                    <input type="text" placeholder='Bairro' value={bairro} onChange={(e) => setBairro(e.target.value)} required />
                    <input type="text" placeholder='Numero da Casa' value={numerocasa} onChange={(e) => setNumerocasa(e.target.value)} required />
                </div>
                <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <button type="submit">Registrar</button>
            </form>
        </div>

    )


}
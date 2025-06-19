import React, { useState } from 'react';

export default function MenuItens({ dadosMenu, onAdicionar }) {
  const categorias = ['Pratos Feitos', 'Carnes', 'Frituras', 'Bebidas', 'Sobremesas'];
  const [categoriaAtual, setCategoriaAtual] = useState('Pratos Feitos');
  const itens = dadosMenu[categoriaAtual] || [];
  const [adicionado, setAdicionado] = useState(false);
  const [animacaosaida, setAnimacaoSaida] = useState(false)
  const [animacaoentrada, setAnimacaoEntrada] = useState(false)

  function mensagemadicionar() {
    setAdicionado(true)

    setTimeout(() => {
      setAdicionado(false);
    }, 2000);
  }

  function animaritens(novacategoria) {
    if (novacategoria == categoriaAtual) return;
    setAnimacaoSaida(true)


    setTimeout(() => {
      setAnimacaoSaida(false);
      setCategoriaAtual(novacategoria)
      setAnimacaoEntrada(true);

      setTimeout(() => {
        setAnimacaoEntrada(false)
      }, 600)
    }, 600);
  }

  return (
    <div className="containermenu">
      <h2>Menu</h2>

      <div className="container-categorias">
        {categorias.map(categoria => (
          <button key={categoria}
            className={`categorias-itens ${categoria === categoriaAtual ? 'active' : ''}`}
            onClick={() => { animaritens(categoria) }}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="itensmenu">
        <div className="carouselmenu">
          <h1 id='titulocategoria' className={`titulocategoria ${animacaosaida ? 'animacao-saida-categoria' : animacaoentrada ? 'animacao-entrada-abaixo-categoria' : 'animacao-entrada-categoria'}`}>{categoriaAtual}</h1>

          <div className={`conteudo ${animacaosaida ? 'animacao-saida' : animacaoentrada ? 'animacao-entrada-abaixo' : 'animacao-entrada'}`}>
            {itens.length === 0 ? (
              <p>Sem itens nesta categoria.</p>
            ) : (
              itens.map(item => (

                <div className="itens" key={item.id}>
                  <img src={item.imagem} />
                  <h3>{item.nome}</h3>
                  <h2>{item.descricao}</h2>
                  <p>R$ {item.preco.toFixed(2)}</p>
                  <button onClick={() => { onAdicionar(item); mensagemadicionar() }}>Adicionar</button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className={`popup-itemadicionado ${!adicionado ? 'popup-escondido' : ''}`}>Item adicionado</div>
      </div>
    </div>
  );
}
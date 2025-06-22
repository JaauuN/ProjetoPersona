import React, { useState } from 'react';

export default function MenuItens({ dadosMenu, adicionaritem }) {
  const categorias = ['Pratos Regionais', 'Carnes', 'Frituras', 'Bebidas', 'Sobremesas'];
  const [categoriaAtual, setCategoriaatual] = useState('Pratos Regionais');
  const itens = dadosMenu[categoriaAtual] || [];

  const [popupadicionado, setPopupadicionado] = useState(false);
  const [animacaosaida, setAnimacaoSaida] = useState(false)
  const [animacaoentrada, setAnimacaoEntrada] = useState(false)

  function mensagemadicionar() {
    setPopupadicionado(true)

    setTimeout(() => {
      setPopupadicionado(false);
    }, 1000);
  }

  function animaritens(novacategoria) {
    if (novacategoria == categoriaAtual) return;
    setAnimacaoSaida(true)


    setTimeout(() => {
      setAnimacaoSaida(false);
      setCategoriaatual(novacategoria)
      setAnimacaoEntrada(true);

      setTimeout(() => {
        setAnimacaoEntrada(false)
      }, 600)
    }, 600);
  }

  return (
    <div className="containermenu">
      <h2>Menu</h2>

      {/*Aqui eu percorro o array de categorias e para cada categoria eu recrio ela em um botao, que quando clicado retorna os itens da categoria escolhida que vira categoriaAtual */}
      {/*Array é como se fosse uma lista ordenada de elementos, mas não é uma lista */}
      <div className="container-categorias">
        {categorias.map(categoria => (<button key={categoria} className='categorias-itens' onClick={() => {animaritens(categoria)}}> {categoria} </button>))}
      </div>

      <div className="itensmenu">
        <div className="carouselmenu">
          <h1 id='titulocategoria' className={`titulocategoria ${animacaosaida ? 'animacao-saida-categoria' : animacaoentrada ? 'animacao-entrada-abaixo-categoria' : 'animacao-entrada-categoria'}`}>{categoriaAtual}</h1>
          <div className={`conteudo ${animacaosaida ? 'animacao-saida' : animacaoentrada ? 'animacao-entrada-abaixo' : 'animacao-entrada'}`}>
            {itens.length === 0 ? (<p>Sem itens nesta categoria.</p>) : 
            (itens.map(item => (
                <div className="itens" key={item.id}>
                  <img src={item.imagem} />
                  <h3>{item.nome}</h3>
                  <h2>{item.descricao}</h2>
                  <p>R$ {item.preco.toFixed(2)}</p>
                  <button onClick={() => { adicionaritem(item); mensagemadicionar() }}>Adicionar</button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className={`popup-itemadicionado ${!popupadicionado ? 'popup-escondido' : ''}`}>Item adicionado</div>
      </div>
    </div>
  );
}
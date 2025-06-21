import React from 'react';


export default function CarrinhoCompras({ carrinho, mostrar, Fecharmenu, removeritem, adicionaritem, Fecharpedido }) {

    // let significa que o valor pode mudar ao longo da execução
    let total = 0;
    for (let i = 0; i < carrinho.length; i++) {
        total += carrinho[i].preco * carrinho[i].quantidade;
    }

    return (
        <>
            <div className={`fundo-carrinho ${mostrar ? 'ativo' : ''}`} onClick={Fecharmenu}>
                {/*Uso do stopPropagation serve para impedir o click de Fecharmenu do fundo-carrinho funcione dentro do container do carrinho onde esta os itens que foi adicionado*/}
                <div className={`container-carrinho ${mostrar ? 'mover' : ''}`} onClick={(e) => e.stopPropagation()}>
                    <div className="conteudo-carrinho">
                        <h1 className="text-carrinho">Carrinho</h1>
                        {carrinho.length === 0 ? (<p className='vazio'>Carrinho vazio</p>) :
                            (<div className='carroselitenscarrinho'>
                                {carrinho.map((item) => (
                                    <div key={item.id} className='itenscarrinho'>
                                        <div className='styleitemcarrinho'>
                                            <img src={item.imagem} />
                                            <h2>{item.nome} </h2>
                                            <p>R$ {(item.preco * item.quantidade)}</p>
                                            <div className='contador-itens'>
                                                <button className='mais' onClick={() => adicionaritem(item)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                                </button>
                                                <p>{item.quantidade}</p>
                                                <button className='menos' onClick={() => removeritem(item)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                            )}
                    </div>
                    <div className='conteudo-inferior-carrinho'>
                        <button className='botao-carrinho' onClick={Fecharmenu}>Fechar</button>
                        <button className='fechar-pedido' onClick={Fecharpedido}>Fechar Pedido</button>
                        <div className='subtotal'><p>{`R$ ${total}`}</p></div>
                    </div>
                </div>
            </div>


        </>
    );
}
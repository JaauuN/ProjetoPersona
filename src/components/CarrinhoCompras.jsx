import React from 'react';

export default function CarrinhoCompras({ carrinho, mostrar, onFechar, onremoveritem }) {
        const carrinhoAgrupado = Object.values(
        carrinho.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = { ...item, quantidade: 1 };
            } else {
                acc[item.id].quantidade += 1;
            }
            return acc;
        }, {})
    );
    return (
    <>
      {/* Adiciona um fundo clicavel para fechar o menu */}
      {mostrar && (
    <div className="fundo-carrinho" onClick={onFechar}></div>
  )}

            <div className={`container-carrinho ${mostrar ? 'mover' : ''}`}>
                <div className="conteudo-carrinho">
                    <h1 className="text-carrinho">Carrinho</h1>
                  
        
                    {carrinhoAgrupado.length === 0 ? (
                        <p>Carrinho vazio</p>
                    ) : (
                        <div className='containeritenscarrinho'>
                            {carrinhoAgrupado.map((item) => (
                                <div key={item.id} className='itenscarrinho'>
                                    <img src={item.imagem}/>
                                    <div className='styleitemcarrinho'>
                                       {item.nome} x{item.quantidade} — R$ {(item.preco * item.quantidade).toFixed(2)}
                                    </div>
                                    <button onClick={() => onremoveritem(item.id)}>Remover</button>
                                </div>
                            ))}
                        </div>
                    )}
                        <button className='botao-carrinho' onClick={onFechar}>Fechar</button>
                </div>
            </div>
        </>
    );
}
const rodape = document.querySelector('.rodape');
const btTopo = document.getElementById("btTopo");
const botaocarrinhoagina = document.getElementById('botao-carrinho-pagina');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

/* Animação para quando deve aparecer o Rodape */
  if (scrollY > 1000) {
    rodape.classList.add('mostrar');
  } else {
    rodape.classList.remove('mostrar');
  }

/* Animação para quando deve aparecer o botao que retorna ao topo */
  if (scrollY > 100) {
    btTopo.classList.add('mostrar');
  } else {
    btTopo.classList.remove('mostrar');
  }

  if (scrollY > 100) {
    botaocarrinhoagina.classList.add('mostrar');
  } else {
    botaocarrinhoagina.classList.remove('mostrar');
  }
});
/*Aqui adiciona um leitor de evento (ação) e executa top: 0 na janela */
  btTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
//


const login_registro = document.querySelector('.carrossel_login_registro')
const registrar = document.getElementById('puxarRegistro')
registrar.addEventListener("click",() => {
    login_registro.classList.add('mostrar_registro');
}
)

const login = document.getElementById('puxarLogin')
login.addEventListener("click",() => {
    login_registro.classList.remove('mostrar_registro');
}
)



const menulateral = document.querySelector('.menu-lateral');
const btMenulateral = document.getElementById('bt-Menu-Nav');
const containerlateral = document.querySelector('.container-menu-lateral');

  btMenulateral.addEventListener("click", () => {
    menulateral.classList.toggle('mover');
    btMenulateral.classList.toggle('mover');
    containerlateral.classList.toggle('ativo');
});




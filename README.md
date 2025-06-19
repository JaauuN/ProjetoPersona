# Projeto de Menu 
**Feito usando** 
- React
- JavaScript 
- HTML 
- CSS
- Firebase

### Pré-requisitos
- Precisa ter o [Node.js] instalado (https://nodejs.org/)
### Instalação e Execução
- 1. npm install (**No terminal**)
- 2. npm run dev (**No terminal**) (**Para rodar usando o vite**)

### Roteiro
    React não substitui o JavaScript — ele é feito com JavaScript e para JavaScript, 
    só que te oferece uma “camada a mais” para construir interfaces de forma mais simples, escalável e limpa.
  ### React = JavaScript + um conjunto poderoso de ferramentas para UI

### Explicando algumas dependencia que utilizei no codigo
- 1. **React-Dom** é um pacote React que conecta o React ao DOM real do navegador. 
     Ele é o responsável por renderizar os componentes React dentro de uma página HTML real.
     Sem o uso do React-Dom não seria possivel ter uma visualização real da pagina que montei.~
    ### Dom é uma representação estruturada da página web (HTML)

- 2. **Vite** é uma ferramente que cria um ambiente de desenvolvimento super rápido, 
      com recarga instantânea quando você mexe no código (Hot Module Replacement).
      É como se fosse um **live-server**

- 3. **Firebase** o firebase é um sistema de banco de dados e autenticação totalmente feita por nuvem
      utilizei ele com o intuito de facilitar o salvamento de dados de usuarios e pensando um pouco no futuro do site.
      Com o Firebase utilizei apenas o **Authentication** e o **Firestore Database**. 
      O **Authentication** no Firebase serve para a parte de Login e Autenticação do usuario se ele esta logado ou não. **signInWithEmailAndPassword**
      O **Firestore Database** no Firebase serve para o armazenamento dos dados cadastrado pelo usuario. **createUserWithEmailAndPassword**

### Explicações de linhas do codigo

- Parte de animação com condições no react

**const [animacaosaida, setAnimacaoSaida] = useState(false)**
**const [animacaoentrada, setAnimacaoEntrada] = useState(false)**

**Função que esta no botao categorias onClick**
function animaritens(novacategoria) {
    setAnimacaoSaida(true)
    

    setTimeout(() => {
      setAnimacaoSaida(false);
      setCategoriaAtual(novacategoria)
      setAnimacaoEntrada(true);

      setTimeout(() => {
        setAnimacaoEntrada(false)
      },600)
    }, 600);
}

**{`conteudo ${animacaosaida ? 'animacao-saida' : animacaoentrada ? 'animacao-entrada-abaixo' : 'animacao-entrada'}}**

Quando eu clico no Botao de Categorias, **animacaosaida(false)** vira **animacaosaida(true)**, então executa a classe **animacao-saida** e "para" e depois volta para **animacaosaida(false)**. Ao mesmo tempo tornando o **animacaoentrada(false)** em **animacaoentrada(true)** e mudando a **categoriaAtual** para categoria selecionada, com isso ele faz uma nova iteração com **animacaosaida = false** e **animacaoentrada = true**, com isso vai retornar **animacao-entrada-baixo** e "para" novamente. Depois executa outro setTimeout() e muda **animacaoentrada = false**, depois de se passar 600ms do setTimeout() interno, ele faz outra iteração com **animacaosaida e animacaoentrada = false** retornando no final animacao-entrada que é o valor original.
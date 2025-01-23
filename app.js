let listaDeNumerosSorteados = [];
let numeroLimite = 10; // É o limite máximo para o número secreto.
let numeroSecreto = gerarNumeroAleatorio();
let tentativa =  1;
// Função para evitar repetição de código ao inserir texto em elementos HTML
function exibirTextoNaTela(tag, texto){
let campo = document.querySelector(tag);//seleciona o elemento
   campo.innerHTML = texto; //inseri o texto dentro da tag

      //Vai pegar o texto e transformar ele em áudio.
   if ('speechSynthesis' in window) {
      let utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR'; //define o idioma
      utterance.rate = 1.2; //define velocidade da fala
      window.speechSynthesis.speak(utterance); 
  } else {
      console.log("Web Speech API não suportada neste navegador.");
  }
}
//função para mostrar as mesagens de inicio de jogo
function exibirMensagemInicial(){
   exibirTextoNaTela('h1','Jogo do número secreto');
   exibirTextoNaTela('p', 'Escolha um número entre 1 a 10');  
}

exibirMensagemInicial();
//criou uma função para o botão 'chutar'
function verificarChute() {
   let chute = document.querySelector('input').value;
   if(chute == numeroSecreto){
       exibirTextoNaTela('h1','Você acertou!');
       let palavraTentativa = tentativa > 1? 'tentativas': 'tentativa';
       let mensagemNaTela = `Você acertou o número secreto com ${tentativa} ${palavraTentativa}!`;
       exibirTextoNaTela('p',mensagemNaTela);
       //para ativar o botão de 'Novo jogo'
       document.getElementById('reiniciar').removeAttribute('disabled');

   } else{
      if(chute < numeroSecreto){
         exibirTextoNaTela('p','O número secreto é maior');
      } else{
         exibirTextoNaTela('p','O número secreto é menor');

      }
      tentativa++;
      limparCampo();
   }
}

function gerarNumeroAleatorio(params) {
  let numeroEscolhido = parseInt(Math.random()*numeroLimite+1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; //aqui vai contar quantos numeros já foram armazenados e sorteados na lista, ela vai conta se ja atingiu o
  //numero maximo, e então limpar a lista se caso a lista atingiu o número máximo.
  if (quantidadeDeElementosNaLista == numeroLimite){
   listaDeNumerosSorteados =[];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio()//A função vai chamar ela novamente para escolher outro numero aleatorio.
  }else{  // Caso o elemento não esteja na lista e então vai quer que ele retorne o número escolhido.
      listaDeNumerosSorteados.push(numeroEscolhido);
      console.log(listaDeNumerosSorteados);
      return numeroEscolhido;
  }
   
}function limparCampo() {
   chute = document.querySelector('input');
   chute.value  = ' '; //Para deixar o campo vazio
   
}
//Função para o botâo 'Novo jogo' quando ele for clicado
function reiniciarJogo(){
   numeroSecreto = gerarNumeroAleatorio();
   limparCampo();
   tentativa = 1;
   exibirMensagemInicial();
   //Aqui é para desabilitar novamente o botão 'Novo jogo'
   document.getElementById('reiniciar').setAttribute('disabled',true);

}
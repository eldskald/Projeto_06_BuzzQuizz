//Essa funçao faz com que a tela 1 saia da tela e ainda vai adicionar a tela 3

function carregaTela3(){
   const aux1 = document.querySelector(".lista-de-quizzes").classList
   const aux2 = document.querySelector(".CriarQuizzouQuizzCriados").classList
   aux1.add("escondido");
   aux2.add("escondido");
}
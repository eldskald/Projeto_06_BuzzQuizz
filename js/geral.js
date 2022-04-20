//
// Esse arquivo vai ter variáveis globais e, se precisar, funções que serão usadas
// ao longo de todo o resto do documento.
//

const MAIN = document.querySelector("main");
const API_URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
// const API_URL = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";   Esse é o verdadeiro, v6 é da T6, v4 é da T4 que peguei pra testar

const limparMain = () => { MAIN.innerHTML = ""; };


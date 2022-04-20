//
// Esse arquivo vai ter variáveis globais e, se precisar, funções que serão usadas
// ao longo de todo o resto do documento.
//

const MAIN = document.querySelector("main");
const API_URL = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
const API_TESTE = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

const limparMain = () => { MAIN.innerHTML = ""; };

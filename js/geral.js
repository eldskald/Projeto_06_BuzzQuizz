//
// Esse arquivo vai ter variáveis globais e, se precisar, funções que serão usadas
// ao longo de todo o resto do documento.
//

const MAIN = document.querySelector("main");
const API_URL = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

const limparMain = () => { MAIN.innerHTML = ""; };

function resetarScroll () {
    window.scrollTo(0, 0);
    MAIN.scrollTo(0, 0);
}


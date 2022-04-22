//
// Esse arquivo vai ter variáveis globais e, se precisar, funções que serão usadas
// ao longo de todo o resto do documento.
//

const MAIN = document.querySelector("main");
const API_URL = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";   //Esse é o verdadeiro, v6 é da T6, v4 é da T4 que peguei pra testar

let arrayQuizzes = [];

const limparMain = () => { MAIN.innerHTML = ""; };

function resetarScroll () {
    window.scrollTo(0, 0);
    MAIN.scrollTo(0, 0);
}

function pegarQuizPeloID (id) {
    for (let i = 0; i < arrayQuizzes.length; i++) {
        const quiz = arrayQuizzes[i];
        if (quiz.id === id) {
            return quiz;
        }
    }
    return null;
}

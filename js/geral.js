//
// Esse arquivo vai ter variáveis globais e, se precisar, funções que serão usadas
// ao longo de todo o resto do documento.
//

const MAIN = document.querySelector("main");
const API_URL = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

function resetarScroll () {
    window.scrollTo(0, 0);
    MAIN.scrollTo(0, 0);
}

function renderizarSpinner () {
    MAIN.innerHTML += `
        <figure class="spinner">
            <img src="img/spinner.svg" />
            <figcaption>Aguarde...</figcaption>
        </figure>
    `;
}

const limparMain = () => { MAIN.innerHTML = ""; };
const removerSpinner = () => { MAIN.querySelector(".spinner").remove(); };



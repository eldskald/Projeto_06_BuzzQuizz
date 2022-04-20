
function carregarTelaUm () {
    limparMain();
    carregarQuizzes();
}



// Funções relacionadas a carregar os quizzes da seção de todos os quizzes.
function carregarQuizzes () {
    const promessa = axios.get(API_TESTE);

    promessa.then(function (resposta) {
        const quizzes = resposta.data.filter(filtrarQuizzes);
        renderizarQuizzes(quizzes);
    });
}

function filtrarQuizzes (quiz) {
    return true;    // Sem filtragem por enquanto
}

function renderizarQuizzes (quizzes) {
    let quizzesHTML = "";
    for (let i = 0; i < quizzes.length; i++) {
        quizzesHTML += gerarQuizHTML(quizzes[i]);
    }
    MAIN.innerHTML += `
        <section class="lista-de-quizzes">
            <header>Todos os Quizzes</header>
            <div>
                ${quizzesHTML}
            </div>
        </section>
    `;
}

function gerarQuizHTML (quiz) {
    return `
        <figure>
            <img src=${quiz.image} />
            <figcaption>
                ${quiz.title}
            </figcaption>
        </figure>
    `;
}
// Funções relacionadas a carregar os quizzes da seção de todos os quizzes.



carregarTelaUm();

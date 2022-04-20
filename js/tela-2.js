

function carregarTela2 (id) {
    limparMain();
    const quiz = pegarQuizPeloID(id);
    renderizarQuiz(quiz);
}

function renderizarQuiz (quiz) {
    MAIN.innerHTML += renderizarTituloDoQuiz(quiz);
}

function renderizarTituloDoQuiz (quiz) {
    return `
        <header class="titulo-do-quiz">
            <img src=${quiz.image} />
            <h1>${quiz.titulo}</h1>
        </header>
    `;
}

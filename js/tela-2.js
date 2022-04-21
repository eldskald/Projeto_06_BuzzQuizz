

function carregarTela2 (id) {
    limparMain();
    const quiz = pegarQuizPeloID(id);
    renderizarQuiz(quiz);
}

function renderizarQuiz (quiz) {
    MAIN.innerHTML += renderizarTituloDoQuiz(quiz);
    for (let i = 0; i < quiz.questions.length; i++) {
        MAIN.innerHTML += renderizarPergunta(quiz.questions[i]);
    }
}

function renderizarTituloDoQuiz (quiz) {
    return `
        <header class="titulo-do-quiz">
            <img src=${quiz.image} />
            <h1>${quiz.title}</h1>
        </header>
    `;
}

function renderizarPergunta (pergunta) {
    let respostasHTML = "";
    let arrRespostas = pergunta.answers;
    arrRespostas.sort(() => Math.random() - 0.5);
    for (let i = 0; i < arrRespostas.length; i++) {
        respostasHTML += renderizarResposta(arrRespostas[i]);
    }
    return `
        <section class="pergunta-container">
            <header style="background-color: ${pergunta.color}">
                ${pergunta.title}
            </header>
            <div>
                ${respostasHTML}
            </div>
        </section>
    `;
}

function renderizarResposta (resposta) {
    return `
        <figure>
            <img src=${resposta.image} />
            <figcaption>
                ${resposta.text}
            </figcaption>
        </figure>
    `;
}

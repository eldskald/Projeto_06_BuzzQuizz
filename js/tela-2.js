
let perguntasAcertadas;
let totalDePerguntas;

function carregarTela2 (id) {
    limparMain();
    const quiz = pegarQuizPeloID(id);
    renderizarQuiz(quiz);
    perguntasAcertadas = 0;
    totalDePerguntas = quiz.questions.length;
    window.scrollTo(0, 0);
    MAIN.scrollTo(0, 0);
}



// Funções que lidam com renderização dos quizzes
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
    let classes;
    if (resposta.isCorrectAnswer) {
        classes = "certa";
    }
    else {
        classes = "errada";
    }
    return `
        <figure>
            <img class="nao-revelada ${classes}" src=${resposta.image} onclick="escolherResposta(this)" />
            <figcaption class="nao-revelada ${classes}">
                ${resposta.text}
            </figcaption>
        </figure>
    `;
}
// Funções que lidam com renderização dos quizzes



// Funções que lidam com o comportamento das respostas
function escolherResposta (nodo) {
    const perguntaNodo = nodo.parentNode.parentNode.parentNode;
    if (perguntaNodo.classList.contains("respondida")) {
        return;
    }

    perguntaNodo.classList.add("respondida");
    const respostas = perguntaNodo.querySelector("div").querySelectorAll("figure");
    for (let i = 0; i < respostas.length; i++) {
        revelarResposta(respostas[i]);
    }

    const acertou = nodo.classList.contains("certa");
    if (acertou) {
        perguntasAcertadas++;
    }
}

function revelarResposta (nodo) {
    nodo.querySelector("img").classList.remove("nao-revelada");
    nodo.querySelector("figcaption").classList.remove("nao-revelada");
}
// Funções que lidam com o comportamento das respostas
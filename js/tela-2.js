
let totalAcertos;
let perguntasRespondidas;
let totalPerguntas;

function carregarTela2 (id) {
    limparMain();
    const quiz = pegarQuizPeloID(id);
    renderizarQuiz(quiz);
    totalAcertos = 0;
    perguntasRespondidas = 0;
    totalPerguntas = quiz.questions.length;
    window.scrollTo(0, 0);
    MAIN.scrollTo(0, 0);
}



// Funções que lidam com renderização dos quizzes
function renderizarQuiz (quiz) {
    MAIN.innerHTML += htmlTituloDoQuiz(quiz);
    for (let i = 0; i < quiz.questions.length; i++) {
        MAIN.innerHTML += htmlPergunta(quiz.questions[i], i);
    }
}

function htmlTituloDoQuiz (quiz) {
    return `
        <header class="titulo-do-quiz">
            <img src=${quiz.image} />
            <h1>${quiz.title}</h1>
        </header>
    `;
}

function htmlPergunta (pergunta, indice) {
    let respostasHTML = "";
    let arrRespostas = pergunta.answers;
    arrRespostas.sort(() => Math.random() - 0.5);
    for (let i = 0; i < arrRespostas.length; i++) {
        respostasHTML += htmlResposta(arrRespostas[i]);
    }
    return `
        <section class="pergunta-container" id="pergunta-${indice}">
            <header style="background-color: ${pergunta.color}">
                ${pergunta.title}
            </header>
            <div>
                ${respostasHTML}
            </div>
        </section>
    `;
}

function htmlResposta (resposta) {
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
function escolherResposta (imagemClicada) {
    const perguntaNodo = imagemClicada.parentNode.parentNode.parentNode;
    if (perguntaNodo.classList.contains("respondida")) {
        return;
    }
    perguntaNodo.classList.add("respondida");
    
    revelarResposta(perguntaNodo);
    lidarComAcertos(imagemClicada);
    checarFim();
}

function revelarResposta (pergunta) {
    const opcoes = pergunta.querySelector("div").querySelectorAll("figure");
    opcoes.forEach(function (opcao) {
        opcao.querySelector("img").classList.remove("nao-revelada");
        opcao.querySelector("figcaption").classList.remove("nao-revelada");
    });
    setTimeout(irParaProximaPergunta, 2000, pergunta);
}

function irParaProximaPergunta (perguntaAtual) {
    const indice = Number(perguntaAtual.id.replace("pergunta-", ""));
    proximaPergunta = document.getElementById("pergunta-" + (indice + 1));
    if (proximaPergunta) {
        if (window.matchMedia("(max-width: 1100px)").matches) {
            proximaPergunta.scrollIntoView({behavior: "smooth"});
        }
        else {
            const topCoord = posVerticalNaPagina(proximaPergunta) - 84;
            window.scrollTo({left: 0, top: topCoord, behavior: "smooth"});
        }
    }
}

function posVerticalNaPagina (elemento) {
    return elemento.getBoundingClientRect().top + window.pageYOffset;
}

function lidarComAcertos (imagemResposta) {
    perguntasRespondidas++;
    if (imagemResposta.classList.contains("certa")) {
        totalAcertos++;
    }
}

function checarFim () {
    if (perguntasRespondidas < totalPerguntas) {
        return;
    }
}
// Funções que lidam com o comportamento das respostas
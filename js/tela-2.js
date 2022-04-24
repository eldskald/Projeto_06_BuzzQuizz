
let totalAcertos;
let perguntasRespondidas;
let totalPerguntas;
let quizEscolhido;

function carregarTela2 (id) {
    limparMain();
    resetarScroll();
    renderizarSpinner();
    const promessa = axios.get(API_URL + `/${id}`);

    promessa.then(function (resposta) {
        quizEscolhido = resposta.data;
        removerSpinner();
        renderizarQuiz(quizEscolhido);
        totalAcertos = 0;
        perguntasRespondidas = 0;
        totalPerguntas = quizEscolhido.questions.length;
    });
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
    if (perguntasRespondidas === totalPerguntas) {
        revelarResultados();
    }
}
// Funções que lidam com o comportamento das respostas



// Funções que lidam com o resultado
function revelarResultados () {
    const pontuacao = Math.floor((totalAcertos * 100) / totalPerguntas);
    const nivel = pegarNivelObtido(pontuacao);
    renderizarResultados(nivel, pontuacao);
    setTimeout(scrollarParaResultados, 2000);
}

function pegarNivelObtido (pontuacao) {
    let niveisEmOrdem = quizEscolhido.levels.map((nivel, indice) => ({id: indice, minValue: nivel.minValue}));
    niveisEmOrdem.sort((a, b) => a.minValue - b.minValue);
    for (let i = niveisEmOrdem.length - 1; i >= 0; i--) {
        if (pontuacao >= niveisEmOrdem[i].minValue) {
            return quizEscolhido.levels[niveisEmOrdem[i].id];
        }
    }
}

function renderizarResultados (nivel, pontuacao) {
    MAIN.innerHTML += `
        <section class="resultados-container">
            <header>${pontuacao}% de acerto: ${nivel.title}</header>
            <div>
                <img src=${nivel.image} />
                <div>${nivel.text}</div>
            </div>
        </section>

        <div class="botao-refazer" onclick="carregarTela2(${quizEscolhido.id})">
            Refazer quiz
        </div>

        <div class="botao-retornar" onclick="window.location.reload()">
            Voltar para o home
        </div>
    `;
}

function scrollarParaResultados () {
    // const botaoRetornar = MAIN.querySelector(".botao-retornar");
    // botaoRetornar.scrollIntoView({behavior: "smooth"});

    const resultados = MAIN.querySelector(".resultados-container");
    if (window.matchMedia("(max-width: 1100px)").matches) {
        resultados.scrollIntoView({behavior: "smooth"});
    }
    else {
        const topCoord = posVerticalNaPagina(resultados) - 84;
        window.scrollTo({left: 0, top: topCoord, behavior: "smooth"});
    }
}
// Funções que lidam com o resultado

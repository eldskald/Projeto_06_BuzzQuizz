
function carregarTelaUm () {
    limparMain();
    botaoCriarQuizz()
    carregarQuizzes();
}

function botaoCriarQuizz(){
    MAIN.innerHTML = `
    <div class = "CriarQuizzouQuizzCriados">
        <p>Você não criou nenhum</br> quizz ainda :(</p>
        <button class="botaoCriarQuizz" onclick="carregaTela3()">
            <p>Criar Quizz</p>
        </button>
    </div>
        `
}



// Funções relacionadas a carregar os quizzes da seção de todos os quizzes.
function carregarQuizzes () {
    const promessa = axios.get(API_URL);

    promessa.then(function (resposta) {
        const quizzes = resposta.data.filter((quiz) => !possuiSalvo(quiz.id));
        renderizarQuizzes(quizzes);
    });
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



// Lida com a serialização no localStorage das quizzes criads pelo usuário.
function salvarQuizzesCriados (arr) {
    const dadoSerializado = JSON.stringify(arr);
    localStorage.setItem("quizzesCriados", dadoSerializado);
}

function pegarQuizzesCriados () {
    const dado = JSON.parse(localStorage.getItem("quizzesCriados"));
    if (dado === null) {
        return [];
    }
    return JSON.parse(dadoSerializado);
}

function possuiSalvo (id) {
    const arr = pegarQuizzesCriados();
    if (arr.length === 0) {
        return false;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === id) {
            return true;
        }
    }
    return false;
}
// Lida com a serialização no localStorage das quizzes criads pelo usuário.



carregarTelaUm();

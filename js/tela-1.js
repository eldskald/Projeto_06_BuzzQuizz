
function carregarTela1 () {
    limparMain();
    botaoCriarQuizz();
    carregarQuizzes();
}

function botaoCriarQuizz(){
    const aux = pegarQuizzesCriados();
    console.log(aux);
    if(!aux){
        console.log("teste 1")
        MAIN.innerHTML = `
            <div class = "CriarQuizzouQuizzCriados">
                <p>Você não criou nenhum</br> quizz ainda :(</p>
                <button class="botaoCriarQuizz" onclick="carregaTela3()">
                    <p>Criar Quizz</p>
                </button>
            </div>
        `;
    }
    else{
        const quizzes = resposta.data.filter((quiz) => possuiSalvo(quiz.id));
        renderizarQuizzes(quizzes);
        console.log("teste 2")
    }
}



// Funções relacionadas a carregar os quizzes da seção de todos os quizzes.
function carregarQuizzes () {
    const promessa = axios.get(API_URL);

    promessa.then(function (resposta) {
        arrayQuizzes = resposta.data;
        const quizzes = arrayQuizzes.filter((quiz) => !possuiSalvo(quiz.id));
        renderizarQuizzes();
    });
}

function renderizarQuizzes () {
    let quizzesHTML = "";
    for (let i = 0; i < arrayQuizzes.length; i++) {
        quizzesHTML += gerarQuizHTML(arrayQuizzes[i]);
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
        <figure onclick="carregarTela2(${quiz.id})">
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
        return false;
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



carregarTela1();

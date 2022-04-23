
let arrayQuizzes = [];

function carregarTela1 () {
    limparMain();
    resetarScroll();

    const promessa = axios.get(API_URL);
    promessa.then(function (resposta) {
        arrayQuizzes = resposta.data;
        carregarQuizzesDoUsuario();
        carregarQuizzesDosOutros();
    });
}



// Funções relacionadas a carregar os quizzes da seção de quizzes criados pelo usuário.
function carregarQuizzesDoUsuario () {
    const aux = JSON.parse(localStorage.getItem("IDS"));
    if (aux === null) {
        botaoCriarQuizz();
    }
    else {
        const quizzes = arrayQuizzes.filter(criadoPeloUsuario);
        const qUser = renderizarQuizzesUsuario(quizzes);
        CarregarUser(qUser);
    }
}

function botaoCriarQuizz(){
    MAIN.innerHTML = `
        <div class = "CriarQuizzouQuizzCriados">
            <p>Você não criou nenhum</br> quizz ainda :(</p>
            <button class="botaoCriarQuizz" onclick="carregaTela3()">
                <p>Criar Quizz</p>
            </button>
        </div>
    `;
}

function CarregarUser(elemento){
    MAIN.innerHTML += `
                <div class="user">
                <div class="head"><header>Seus Quizzes</header>  <ion-icon class="addNewQuizz" name="add-circle" onclick="carregaTela3()"></ion-icon> </div>
                <div>${elemento}</div>
                </div>
            `;
}

function renderizarQuizzesUsuario (quizzes) {
    let quizzesHTML = "";
    console.log(quizzes)
    for (let i = 0; i < quizzes.length; i++) {
        quizzesHTML += gerarQuizUsuarioHTML(quizzes[i]);
    }
    return quizzesHTML;
}

function criadoPeloUsuario(quizzes){
    const aux = JSON.parse(localStorage.getItem("IDS"));
    if (aux === null) {
        return false;
    }

    for (let i = 0; i < aux.length; i++) {
        if (quizzes.id == aux[i].id) {
            return true;
        }
    }
    return false;
}
// Funções relacionadas a carregar os quizzes da seção de quizzes criados pelo usuário.



// Funções relacionadas a carregar os quizzes da seção de todos os quizzes.
function carregarQuizzesDosOutros () {
    const quizzes = arrayQuizzes.filter((quiz) => !criadoPeloUsuario(quiz));
    renderizarQuizzes(quizzes);
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
        <figure onclick="carregarTela2(${quiz.id})">
            <img src=${quiz.image} />
            <figcaption>
                ${quiz.title}
            </figcaption>
        </figure>
    `;
}

function gerarQuizUsuarioHTML (quiz) {
    return `
        <figure onclick="carregarTela2(${quiz.id})">
            <img src=${quiz.image} />
            <figcaption>
                ${quiz.title}
            </figcaption>
            <div>
                <ion-icon name="create-outline"></ion-icon>
                <ion-icon name="trash-outline"></ion-icon>
            </div>
        </figure>
    `;
}
// Funções relacionadas a carregar os quizzes da seção de todos os quizzes.



carregarTela1();
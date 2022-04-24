
let arrayQuizzes = [];

function carregarTela1 () {
    limparMain();
    resetarScroll();

    const promessa = axios.get(API_URL);
    promessa.then(function (resposta) {
        arrayQuizzes = resposta.data;
        carregarQuizzesDoUsuario();
    });
}



// Funções relacionadas a carregar os quizzes da seção de quizzes criados pelo usuário.
let QCriadoUser = [];

function tratarPromise(qCriado){
    const aux = JSON.parse(localStorage.getItem("IDS"));
    QCriadoUser.push(qCriado);
    if(QCriadoUser.length === aux.length){
        renderizarQuizzesUsuario(QCriadoUser);
    }
}

function recuperarQuizzUsuario(lista){
    for(let i = 0; i<lista.length;i++){
        const auxiliar = axios.get(API_URL+"/"+lista[i].id)
        auxiliar.then(tratarPromise)
    }
}


function carregarQuizzesDoUsuario () {
    const aux = JSON.parse(localStorage.getItem("IDS"));
    if (aux === null) {
        botaoCriarQuizz();
    }
    else {
        recuperarQuizzUsuario(aux);
    }
}

function botaoCriarQuizz() {
    MAIN.innerHTML = `
        <div class = "CriarQuizzouQuizzCriados">
            <p>Você não criou nenhum</br> quizz ainda :(</p>
            <button class="botaoCriarQuizz" onclick="carregaTela3()">
                <p>Criar Quizz</p>
            </button>
        </div>
    `;
}

function CarregarUser (elemento) {
    MAIN.innerHTML += `
        <div class="user">
            <div class="head">
                <header>Seus Quizzes</header>
                <ion-icon class="addNewQuizz" name="add-circle" onclick="carregaTela3()"></ion-icon>
            </div>
        <div>${elemento}</div>
        </div>
    `;
    carregarQuizzesDosOutros();
}

function gerarQuizUsuarioHTML (quiz) {
    return `
        <div>
            <figure onclick="carregarTela2(${quiz.data.id})">
                <img src=${quiz.data.image} />
                <figcaption>
                    ${quiz.data.title}
                </figcaption>
            </figure>
            <div>
                <div><ion-icon name="create-outline" onclick="editarQuizz(${quiz.data.id})"></ion-icon></div>
                <div><ion-icon name="trash-outline" onclick="deletarQuizz(${quiz.data.id})"></ion-icon></div>
            </div>
        </div>
    `;
}

function renderizarQuizzesUsuario (quizzes) {
    let quizzesHTML = "";
    for (let i = 0; i < quizzes.length; i++) {
        quizzesHTML += gerarQuizUsuarioHTML(quizzes[i]);
    }
    CarregarUser(quizzesHTML);
}

function criadoPeloUsuario (quizzes) {
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
// Funções relacionadas a carregar os quizzes da seção de todos os quizzes.



// Funções ligadas a edição e remoção de quizzes (bônus)
function editarQuizz (id) {
    carregaTela3(id);
}

function deletarQuizz (id) {
    alert("deletar" + id);
}
// Funções ligadas a edição e remoção de quizzes (bônus)



carregarTela1();

function carregarTela1 () {
    limparMain();
    botaoCriarQuizz();
    resetarScroll();
}

function foicriada(quizzes){
    const aux = JSON.parse(localStorage.getItem("IDS"));
    for(let i=0;i<aux.length;i++){
        if(quizzes.id == aux[i].id){
            console.log("entrou")
            return true;
        }
    }
    return false;
}

function CarregarUser(elemento){
    MAIN.innerHTML=`
                <div class="user">
                <div class="head"><header>Seus Quizzes</header>  <ion-icon class="addNewQuizz" name="add-circle" onclick="carregaTela3()"></ion-icon> </div>
                <div>${elemento}</div>
                </div>
            `
            carregarQuizzes();
}

function botaoCriarQuizz(){
    const aux = JSON.parse(localStorage.getItem("IDS"));
    if(aux === null){
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
        const promessa = axios.get(API_URL);
        promessa.then(function (resposta) {
            arrayQuizzes = resposta.data;
            const quizzes = arrayQuizzes.filter(foicriada);
            console.log(quizzes)
            const qUser = renderizarQuizzesUsuario(quizzes);
            CarregarUser(qUser);
        });
    }
}

function renderizarQuizzesUsuario (quizzes) {
    let quizzesHTML = "";
    console.log(quizzes)
    for (let i = 0; i < quizzes.length; i++) {
        quizzesHTML += gerarQuizHTML(quizzes[i]);
    }
    return quizzesHTML;
}

//Nova função para filtrar os Quizzes q NÃO foram feitos pelo usuario.
function NfoiFeito(quizzes){
    const aux = JSON.parse(localStorage.getItem("IDS"));
    for(let i=0;i<aux.length;i++){
        if(quizzes.id != aux[i].id){
            console.log("entrou")
            return true;
        }
    }
    return false;
}
// Funções relacionadas a carregar os quizzes da seção de todos os quizzes.
function carregarQuizzes () {
    const promessa = axios.get(API_URL);

    promessa.then(function (resposta) {
        arrayQuizzes = resposta.data;
        const quizzes = arrayQuizzes.filter(NfoiFeito);
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

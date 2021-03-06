//Variaveis globais
let titulo;
let Url;
let NPerg;
let NNiveis;
let verificadorNivel = 0;
// Objeto que recebe as informações do Quizz
let quizz={};
let questions=[];
let levels=[];
// Objeto que recebe as informações do Quizz

// Para a edição de um quiz
let quizOriginal;


//Essa funçao faz com que a tela 1 saia da tela e ainda vai adicionar a tela 3
function carregaTela3(editarID){
    limparMain();
    quizOriginal = null;
    if (editarID) {
        renderizarSpinner();
        const promessa = axios.get(API_URL + `/${editarID}`);
        promessa.then(function (resposta) {
            quizOriginal = resposta.data;
            removerSpinner();
            telaInfoBasica();
        });
    }
    else {
        telaInfoBasica();
    }
} 

function verifTitulo(titulo){
    if(titulo.length >= 20 && titulo.length <= 65){
        document.querySelector(".erroT").classList.add("escondido")
        return true;
    }
    else{
        document.querySelector(".erroT").classList.remove("escondido")
        return false;
    }
}

function verifUrl(url){
    const pattern = "https://";
    if (url.includes(pattern)) {    
        document.querySelector(".erroI").classList.add("escondido")
        return true;
    }
    else {
        document.querySelector(".erroI").classList.remove("escondido")
        return false;
    }
}

function verifUrl2(url,numero){
    const pattern = "https://";
    if (url.includes(pattern)) {    
        document.querySelector(".erroI-"+numero).classList.add("escondido")
        return true;
    }
    else {
        document.querySelector(".erroI-"+numero).classList.remove("escondido")
        return false;
    }
}

function verifUrlINC(url, numero){
    const pattern = "https://";
    if (url.includes(pattern) || url=="" ) {    
        document.querySelector(".erroI-"+numero).classList.add("escondido")
        return true;
    }
    else {
        document.querySelector(".erroI-"+numero).classList.remove("escondido")
        return false;
    }
}

function verifNperguntas(Nperg){
    if(Nperg >= 3){
        document.querySelector(".erroP").classList.add("escondido")
        return true;
    }
    else{
        document.querySelector(".erroP").classList.remove("escondido")
        return false;
    }
}

function verifNiveis(NNiveis){
    if(NNiveis >= 2){
        document.querySelector(".erroN").classList.add("escondido")
        return true;
    }
    else{
        document.querySelector(".erroN").classList.remove("escondido")
        return false;
    }
}

function VTXTperg(TXT, numero){
    if(TXT.length >= 20){
        document.querySelector(".erroTXT-"+numero).classList.add("escondido");
        return true;
    }
    else{
        document.querySelector(".erroTXT-"+numero).classList.remove("escondido");
        return false;
    }
}

function VCor(cor, numero){
    const auxiliar = cor.includes("#");
    if(auxiliar && cor.length == 7){
        document.querySelector(".erroCor-"+numero).classList.add("escondido");
        return true;
    }
    else{
        document.querySelector(".erroCor-"+numero).classList.remove("escondido");
        return false;
    }
}

function VRespostas(RCorreta, RINcorreta1, RINcorreta2,RINcorreta3,numero){
    if(RCorreta!="" && (RINcorreta1!="" || RINcorreta2!="" || RINcorreta3!="" )){
        document.querySelector(".erroRC-"+numero).classList.add("escondido")
        document.querySelector(".erroRI-"+numero).classList.add("escondido")
        return true;
    }
    else{
        if(RCorreta==""){
            document.querySelector(".erroRC-"+numero).classList.remove("escondido")
        }
        if(RINcorreta1==""&& RINcorreta2=="" && RINcorreta3==""){
            document.querySelector(".erroRI-"+numero).classList.remove("escondido")
        }
        return false;
    }
}

let contador = 0;

function verifResp(elemento,numero){

    const pai = elemento.parentNode;
    const txt = document.querySelector(".marker").innerHTML;

    const TXTP = document.querySelector(`.TXTPerg-${numero}`).value;
    const Cor = document.querySelector(`.CorPerg-${numero}`).value;
    const RCorreta = document.querySelector(`.RespCorreta-${numero}`).value;
    const URLCorreta = document.querySelector(`.IMGCorreta-${numero}`).value;
    const RINcorreta1 = document.querySelector(`.RespIncorreta1-${numero}`).value;
    const UrlIncorreta1 = document.querySelector(`.IMGIncorreta1-${numero}`).value;
    const RINcorreta2 = document.querySelector(`.RespIncorreta2-${numero}`).value;
    const UrlIncorreta2 = document.querySelector(`.IMGIncorreta2-${numero}`).value;
    const RINcorreta3 = document.querySelector(`.RespIncorreta3-${numero}`).value;
    const UrlIncorreta3 = document.querySelector(`.IMGIncorreta3-${numero}`).value;
    
    const aux = VTXTperg(TXTP, numero);
    const aux2 = VCor(Cor, numero);
    const aux3 = VRespostas(RCorreta, RINcorreta1, RINcorreta2,RINcorreta3, numero);
    const aux4 = verifUrl2(URLCorreta, numero);
    const aux5 = verifUrl2(UrlIncorreta1, numero);
    const aux6 = verifUrlINC(UrlIncorreta2, numero);
    const aux7 = verifUrlINC(UrlIncorreta3, numero);
   
    
   if(aux && aux2 && aux3 && aux4 && aux5 && aux6 && aux7){
        if(RINcorreta2=="" && RINcorreta3==""){
            questions[contador]= {

                title: TXTP,
                color: Cor,
                answers: [
                    {
                        text: RCorreta,
                        image: URLCorreta,
                        isCorrectAnswer: true
                    },
                    {
                        text: RINcorreta1,
                        image: UrlIncorreta1,
                        isCorrectAnswer: false
                    }
                ]
            }
        }else if(RINcorreta2!="" && RINcorreta3==""){
            questions[contador]= {

                title: TXTP,
                color: Cor,
                answers: [
                    {
                        text: RCorreta,
                        image: URLCorreta,
                        isCorrectAnswer: true
                    },
                    {
                        text: RINcorreta1,
                        image: UrlIncorreta1,
                        isCorrectAnswer: false
                    },
                    {
                        text: RINcorreta2,
                        image: UrlIncorreta2,
                        isCorrectAnswer: false
                    }
                ]
            }
        }
        else{
            questions[contador]= {

                title: TXTP,
                color: Cor,
                answers: [
                    {
                        text: RCorreta,
                        image: URLCorreta,
                        isCorrectAnswer: true
                    },
                    {
                        text: RINcorreta1,
                        image: UrlIncorreta1,
                        isCorrectAnswer: false
                    },
                    {
                        text: RINcorreta2,
                        image: UrlIncorreta2,
                        isCorrectAnswer: false
                    },
                    {
                        text: RINcorreta3,
                        image: UrlIncorreta3,
                        isCorrectAnswer: false
                    },
    
                ]
            }
        }
       
        contador++;
        pai.innerHTML = `
                <span class="perg">${txt}</span>
                <span><ion-icon name="checkmark-outline"></ion-icon></span>
        `
   }
   else{
       return
   }
   
}


function montaPerg(elemento){
    let aux = elemento.parentNode;
    aux.classList.add("expandida");
    const nome = aux.innerText;
    const num = Number(nome.replace("Pergunta ",""));
    aux.innerHTML = `
    
        <div class="pergExpandida">
            <p class="perg marker">${nome}</p>

            <div class="container-input">
                <div>
                    <p>Pergunta:</p>
                    <input class="TXTPerg-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroTXT-${num} escondido">Certifique-se que sua pergunta tem no mínimo 20 caracteres.</p>
            </div>

            <div class="container-input">
                <div>
                    <p>Cor (hex code):</p>
                    <input class="CorPerg-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroCor-${num} escondido">Certifique-se que sua cor está na forma hexadecimal (#******).</p>
            </div>

            <p class="perg">Resposta correta</p>

            <div class="container-input">
                <div>
                    <p>Resposta certa:</p>
                    <input class="RespCorreta-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroRC-${num} escondido">Certifique-se que você inseriu a resposta certa.</p>
            </div>

            <div class="container-input">
                <div>
                    <p>URL da imagem:</p>
                    <input class="IMGCorreta-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroCorreta-${num} escondido">Certifique-se que seu URL foi escrito de maneira correta.</p>
            </div>

            <p class="perg">Respostas incorretas</p>

            <div class="container-input">
                <div>
                    <p>Resposta errada 1:</p>
                    <input class="RespIncorreta1-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroRI-${num} escondido">Certifique-se que você inseriu pelo menos uma resposta incorreta.</p>
            </div>

            <div class="container-input">
                <div>
                    <p>URL da imagem:</p>
                    <input class="IMGIncorreta1-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroI-${num} escondido">Certifique-se que seu URL foi escrito de maneira correta.</p>
            </div>

            <div class="container-input">
                <div>
                    <p>Resposta errada 2:</p>
                    <input class="RespIncorreta2-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
            </div>

            <div class="container-input">
                <div>
                    <p>URL da imagem:</p>
                    <input class="IMGIncorreta2-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroI-${num} escondido">Certifique-se que seu URL foi escrito de maneira correta.</p>
            </div>

            <div class="container-input">
                <div>
                    <p>Resposta errada 3:</p>
                    <input class="RespIncorreta3-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
            </div>

            <div class="container-input">
                <div>
                    <p>URL da imagem:</p>
                    <input class="IMGIncorreta3-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroI-${num} escondido">Certifique-se que seu URL foi escrito de maneira correta.</p>
            </div>

            <button class="salvar" onclick="verifResp(this,${num})">Salvar Respostas!</button>

        </div>
    
    `

    if (quizOriginal) {
        preencherPergunta(num);
    }
}

function VTituloN(titulo, numero){
    if(titulo.length >= 10){
        document.querySelector(".erroNome-"+numero).classList.add("escondido");
        return true;
    }
    else{
        document.querySelector(".erroNome-"+numero).classList.remove("escondido");
        return false;
    }
}

function VPorcentagem(pct, numero){
    if(pct>=0 && pct<=100){
        if(pct == 0){
            verificadorNivel++;
        }
        return true;
    }
    else{
        document.querySelector(".erroPct-"+numero).classList.remove("escondido");
        return false;
    }
}

function VDescricao(descricao, numero){
    if(descricao.length >= 30){
        return true;
    }
    else{
        document.querySelector(".erroDes-"+numero).classList.remove("escondido");
        return false;
    }
}

let contador2 = 0;

function finalizarQuizz(){
    if(NNiveis == contador2 && verificadorNivel == 1){
        quizz = {
            title: titulo,
            image: Url,
            questions: questions,
            levels: levels
        
        }
        console.log(quizz);

        if (quizOriginal) {
            const quizzEditado = axios({
                method: "PUT",
                headers: { "Secret-Key": pegarChaveSecreta() },
                data: quizz,
                url: API_URL + `/${quizOriginal.id}`
            });
            quizzEditado.then(salvarID);
            quizzEditado.catch(() => alert("Deu ruim n salvou"));
        }
        else {
            const quizzCriado = axios.post(API_URL, quizz);
            quizzCriado.then(salvarID);
            quizzCriado.catch(() => alert("Deu ruim n salvou"));
        }
        verificadorNivel=0;
        
    }
    else{
        if(verificadorNivel != 1){
            alert("Estão ocorrendo erros nas suas porcentagens minimas, use uma e somente uma com valor igual a zero!");
            contador2=0;
            verificadorNivel=0;
            limparMain();
            montaNiveis();
        }
    }
}

function verifNiv(elemento, numero){
    const pai = elemento.parentNode;
    const txt = document.querySelector(".marker").innerHTML;
    
    const TNivel = document.querySelector(`.TituloNivel-${numero}`).value;
    const Porcentagem = Number(document.querySelector(`.Porcentagem-${numero}`).value);
    const URLNivel = document.querySelector(`.UrlNivel-${numero}`).value;
    const DescriçaoNivel = document.querySelector(`.DescricaoNivel-${numero}`).value;

    const aux = VTituloN(TNivel, numero);
    const aux2 = VPorcentagem(Porcentagem, numero);
    const aux3 = verifUrl2(URLNivel, numero);
    const aux4 = VDescricao(DescriçaoNivel, numero);

    if(aux && aux2 && aux3 && aux4){
        levels[contador2]={
			title: TNivel,
			image: URLNivel,
			text: DescriçaoNivel,
			minValue: Porcentagem
		}
        contador2++;
        pai.innerHTML = `
                <span class="perg">${txt}</span>
                <span><ion-icon name="checkmark-outline"></ion-icon></span>
        `
    }
}

function expandeNivel(elemento){
    let aux = elemento.parentNode;
    aux.classList.add("expandida");
    const nome = aux.innerText;
    const num = Number(nome.replace("Nível ",""));

    aux.innerHTML = `
        <div class="pergExpandida">
            <p class="perg marker">${nome}</p>

            <div class="container-input">
                <div>
                    <p>Nome do nível:</p>
                    <input class="TituloNivel-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroNome-${num} escondido">Certifique-se que seu título tem no mínimo 10 caracteres.</p>
            </div>

            <div class="container-input">
                <div>
                    <p>% de acerto mínimo:</p>
                    <input class="Porcentagem-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroPct-${num} escondido">Certifique-se que é um número de 0 a 100.</p>
            </div>

            <div class="container-input">
                <div>
                    <p>URL da imagem:</p>
                    <input class="UrlNivel-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroI-${num} escondido">Certifique-se que é um link válido.</p>
            </div>

            <div class="container-input">
                <div>
                    <p>Descrição:</p>
                    <input class="DescricaoNivel-${num}" type="text" placeholder="Escreva aqui..."></input>
                </div>
                <p class="erroDes-${num} escondido">Certifique-se que sua descrição tem no mínimo 30 caracteres.</p>
            </div>

            <button class="salvar" onclick="verifNiv(this,${num})">Salvar Respostas!</button>
        </div>
    `;

    if (quizOriginal) {
        preencherNivel(num);
    }
}

function montaNiveis(){
    let auxiliar = `<header class="HPerg"><p class="perg">Agora, decida os níveis</p></header>`; 
    for(let i = 1; i <= NNiveis; i++){
        auxiliar += `
        <div class="container">
        <div class="perguntas">
            <p class="perg">Nível ${i}</p>
            <span onclick="expandeNivel(this)"><ion-icon name="create-outline"></ion-icon></span>
        </div>
        </div>
        `
    }
    MAIN.innerHTML = auxiliar + `<button class="finalizarPerg" onclick="finalizarQuizz()">Finalizar Quizz</button>`;
}

function passarNiveis(){
    if(NPerg == contador){
        limparMain();
        montaNiveis();
    }    
}


function criarPerguntas(){
    limparMain();
    let auxiliar = `<header class="HPerg"><p class="perg">Crie suas perguntas</p></header>`; 
    for(let i = 1; i <= NPerg; i++){
        auxiliar += `
        <div class="container">
        <div class="perguntas">
            <p class="perg">Pergunta ${i}</p>
            <span onclick="montaPerg(this)"><ion-icon name="create-outline"></ion-icon></span>
        </div>
        </div>
        `
    }
    MAIN.innerHTML = auxiliar + `<button class="finalizarPerg" onclick="passarNiveis()">Prosseguir para criar níveis</button>`;
}


function verificaInformacoes(){
    titulo = document.querySelector(".title").value;
    Url = document.querySelector(".urlIMG").value;
    NPerg = Number(document.querySelector(".NPerguntas").value);
    NNiveis = Number(document.querySelector(".NNiveis").value);
    
    const aux = verifTitulo(titulo);
    const aux2 = verifUrl(Url);
    const aux3 = verifNperguntas(NPerg);
    const aux4 = verifNiveis(NNiveis);

    if(aux && aux2 && aux3 && aux4){
        criarPerguntas();
    }
    else{
        return
    }
    }


function telaInfoBasica(){
    MAIN.innerHTML = `
        <div class="InfosBasicas">
            <header>
                <h3>Comece pelo começo</h3>
            </header>

            <div class="quadroRespostas">
                <div class="container-input">
                    <div>
                        <p>Título do quizz:</p>
                        <input class="title" type="text" placeholder="Escreva aqui...">
                    </div>
                    <p class="erroT escondido">Certifique-se que seu titulo tem entre 20 e 65 caracteres.</p>
                </div>

                <div class="container-input">
                    <div>
                        <p>URL da imagem:</p>
                        <input class="urlIMG" type="url" placeholder="Escreva aqui...">
                    </div>
                    <p class="erroI escondido">Insira um URL Válido.</p>
                </div>

                <div class="container-input">
                    <div>
                        <p>Total de perguntas:</p>
                        <input class="NPerguntas" type="text" placeholder="Escreva aqui...">
                    </div>
                    <p class="erroP escondido">São necessarios no minimo 3 perguntas.</p>
                </div>

                <div class="container-input">
                    <div>
                        <p>Total de níveis:</p>
                        <input class="NNiveis" type="text" placeholder="Escreva aqui...">
                    </div>
                    <p class="erroN escondido">São necessarios no minimo 2 níveis.</p>
                </div>
            </div>

            <button class="prosseguir" onclick="verificaInformacoes()">
                <p>Prosseguir para criar perguntas</p>
            </button>
        </div>
    `;

    if (quizOriginal) {
        preencherInfoBasica();
    }
}



// Funções pra lidar com edição de um quizz
function preencherInfoBasica () {
    MAIN.querySelector(".title").value = quizOriginal.title;
    MAIN.querySelector(".urlIMG").value = quizOriginal.image;
    MAIN.querySelector(".NPerguntas").value = quizOriginal.questions.length;
    MAIN.querySelector(".NNiveis").value = quizOriginal.levels.length;
}

function preencherPergunta (pergNum) {
    MAIN.querySelector(`.TXTPerg-${pergNum}`).value = quizOriginal.questions[pergNum - 1].title;
    MAIN.querySelector(`.CorPerg-${pergNum}`).value = quizOriginal.questions[pergNum - 1].color;

    MAIN.querySelector(`.RespCorreta-${pergNum}`).value = quizOriginal.questions[pergNum - 1].answers[0].text;
    MAIN.querySelector(`.IMGCorreta-${pergNum}`).value = quizOriginal.questions[pergNum - 1].answers[0].image;

    MAIN.querySelector(`.RespIncorreta1-${pergNum}`).value = quizOriginal.questions[pergNum - 1].answers[1].text;
    MAIN.querySelector(`.IMGIncorreta1-${pergNum}`).value = quizOriginal.questions[pergNum - 1].answers[1].image;

    MAIN.querySelector(`.RespIncorreta2-${pergNum}`).value = quizOriginal.questions[pergNum - 1].answers[2].text;
    MAIN.querySelector(`.IMGIncorreta2-${pergNum}`).value = quizOriginal.questions[pergNum - 1].answers[2].image;

    MAIN.querySelector(`.RespIncorreta3-${pergNum}`).value = quizOriginal.questions[pergNum - 1].answers[3].text;
    MAIN.querySelector(`.IMGIncorreta3-${pergNum}`).value = quizOriginal.questions[pergNum - 1].answers[3].image;
    
}

function preencherNivel (nivNum) {
    MAIN.querySelector(`.TituloNivel-${nivNum}`).value = quizOriginal.levels[nivNum - 1].title;
    MAIN.querySelector(`.Porcentagem-${nivNum}`).value = quizOriginal.levels[nivNum - 1].minValue;
    MAIN.querySelector(`.UrlNivel-${nivNum}`).value = quizOriginal.levels[nivNum - 1].image;
    MAIN.querySelector(`.DescricaoNivel-${nivNum}`).value = quizOriginal.levels[nivNum - 1].text;
}

function pegarChaveSecreta () {
    const aux = JSON.parse(localStorage.getItem("IDS"));
    let chave;
    for (let i = 0; i < aux.length; i++) {
        if (aux[i].id === quizOriginal.id) {
            chave = aux[i].chave;
        }
    }
    return chave;
} 
// Funções pra lidar com edição de um quizz

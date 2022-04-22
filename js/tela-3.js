//Variaveis globais
let titulo;
let Url;
let NPerg;
let NNiveis;
let verificadorNivel = 0;
// Objeto que recebe as informações do Quizz
let quizz=[];
let questions=[];
let levels=[];
// Objeto que recebe as informações do Quizz


//Essa funçao faz com que a tela 1 saia da tela e ainda vai adicionar a tela 3

function carregaTela3(){
    limparMain();
    telaInfoBasica();
} 

function verifTitulo(titulo){
    if(titulo.length >= 20 && titulo.length <= 65){
        return true;
    }
    else{
        return false;
    }
}

function verifUrl(url){
    const pattern = "https://";
    if (url.includes(pattern) || url =="") {    
        return true;
    }
    else {
        return false;
    }
}

function verifNperguntas(Nperg){
    if(Nperg >= 3){
        return true;
    }
    else{
        return false;
    }
}

function verifNiveis(NNiveis){
    if(NNiveis >= 2){
        return true;
    }
    else{
        return false;
    }
}

function VTXTperg(TXT){
    if(TXT.length >= 20){
        return true;
    }
    else{
        return false;
    }
}

function VCor(cor){
    const auxiliar = cor.includes("#");
    if(auxiliar && cor.length == 7){
        return true;
    }
    else{
        return false;
    }
}

function VRespostas(RCorreta, RINcorreta1, RINcorreta2,RINcorreta3){
    if(RCorreta!="" && (RINcorreta1!="" || RINcorreta2!="" || RINcorreta3!="" )){
        return true;
    }
    else{
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
    
    const aux = VTXTperg(TXTP);
    const aux2 = VCor(Cor);
    const aux3 = VRespostas(RCorreta, RINcorreta1, RINcorreta2,RINcorreta3);
    const aux4 = verifUrl(URLCorreta);
    const aux5 = verifUrl(UrlIncorreta1);
    const aux6 = verifUrl(UrlIncorreta2);
    const aux7 = verifUrl(UrlIncorreta3);
   
    
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
       alert("Revise suas resposta e preencha os campos corretamente.");
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
            <input class="TXTPerg-${num}" type="text" placeholder="Texto da pergunta"></input>
            <input class="CorPerg-${num}" type="text" placeholder="Cor de fundo da pergunta"></input>

            <p class="perg">Resposta correta</p>
            <input class="RespCorreta-${num}" type="text" placeholder="Resposta Correta"></input>
            <input class="IMGCorreta-${num}" type="text" placeholder="URL da imagem"></input>

            <p class="perg">Respostas incorretas</p>
            <input class="RespIncorreta1-${num}" type="text" placeholder="Resposta Incorreta 1"></input>
            <input class="IMGIncorreta1-${num}" type="text" placeholder="URL da imagem 1"></input>

            <input class="RespIncorreta2-${num}" type="text" placeholder="Resposta Incorreta 2"></input>
            <input class="IMGIncorreta2-${num}" type="text" placeholder="URL da imagem 2"></input>

            <input class="RespIncorreta3-${num}" type="text" placeholder="Resposta Incorreta 3"></input>
            <input class="IMGIncorreta3-${num}" type="text" placeholder="URL da imagem 3"></input>

            <button class="salvar" onclick="verifResp(this,${num})">Salvar Respostas!</button>

        </div>
    
    `
}

function VTituloN(titulo){
    if(titulo.length >= 10){
        return true;
    }
    else{
        return false;
    }
}

function VPorcentagem(pct){
    if(pct>=0 && pct<=100){
        if(pct == 0){
            verificadorNivel++;
        }
        return true;
    }
    else{
        return false;
    }
}

function VDescricao(descricao){
    if(descricao.length >= 30){
        return true;
    }
    else{
        return false;
    }
}

let contador2 = 0;

function finalizarQuizz(){
    if(levels.length == contador2 && verificadorNivel == 1){
        console.log("Ta quase so falta saber receber e tratar as key do servidor");
        console.log(quizz);
        //axios.post()
    }
    else{
        if(verificadorNivel != 1){
            alert("Estão ocorrendo erros nas suas porcentagens minimas, use uma e somente uma com valor igual a zero!");
            contador2=0;
            verificadorNivel=0;
            limparMain();
            montaNiveis();
        }
        alert("deu ruim")

    }
}

function verifNiv(elemento, numero){
    const pai = elemento.parentNode;
    const txt = document.querySelector(".marker").innerHTML;
    
    const TNivel = document.querySelector(`.TituloNivel-${numero}`).value;
    const Porcentagem = Number(document.querySelector(`.Porcentagem-${numero}`).value);
    const URLNivel = document.querySelector(`.UrlNivel-${numero}`).value;
    const DescriçaoNivel = document.querySelector(`.DescricaoNivel-${numero}`).value;

    const aux = VTituloN(TNivel);
    const aux2 = VPorcentagem(Porcentagem);
    const aux3 = verifUrl(URLNivel);
    const aux4 = VDescricao(DescriçaoNivel);

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
        quizz = [{
            title: titulo,
            image: Url,
            questions: questions,
            levels: levels
        }]
    }else{
        alert("Revise suas resposta e preencha os campos corretamente.")
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

            <input class="TituloNivel-${num}" type="text" placeholder="Titulo do nível"></input>

            <input class="Porcentagem-${num}" type="text" placeholder="% de acerto mínima"></input>

            <input class="UrlNivel-${num}" type="text" placeholder="URL da imagem do nível"></input>

            <input class="DescricaoNivel-${num}" type="text" placeholder="Descrição do nível"></input>

            <button class="salvar" onclick="verifNiv(this,${num})">Salvar Respostas!</button>

        </div>
    
    `
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
    if(questions.length == contador){
        limparMain();
        montaNiveis();
    }
    else{
        alert("Você não prencheu todos os campos necessários, verifique suas respostas e tente novamente!")
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
        alert("Verifique suas respostas e preencha os dados corretamente!");
    }

}


function telaInfoBasica(){
    MAIN.innerHTML = `
        <div class="InfosBasicas">
            <header>
                <h3>Comece pelo começo</h3>
            </header>

            <div class="quadroRespostas">
                <input class="title" type="text" placeholder="Título do seu quizz">
                <input class="urlIMG" type="url" placeholder="URL da imagem do seu quizz (com https)">
                <input class="NPerguntas" type="text" placeholder="Quantidade de perguntas do quizz">
                <input class="NNiveis" type="text" placeholder="Quantidade de níveis do quizz">
            </div>

            <button class="prosseguir" onclick="verificaInformacoes()">
                <p>Prosseguir para criar perguntas</p>
            </button>
        </div>
    `
}





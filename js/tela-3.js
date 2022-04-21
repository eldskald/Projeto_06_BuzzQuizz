//Variaveis globais
let titulo;
let Url;
let NPerg;
let NNiveis;

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
    if (url.includes(pattern)) {    
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

function montaPost(elemento){
    let aux = elemento.parentNode;
    const aux2 = aux.innerHTML;
    const pergExpandida = document.querySelector(".expandida")
    const txt = document.querySelector(".marker");
    if(pergExpandida !== null){
        const txt2 = txt.innerHTML;
        pergExpandida.classList.remove("expandida");
        pergExpandida.innerHTML = `
                <p class="perg">${txt2}</p>
                <span onclick="montaPost(this)"><ion-icon name="create-outline"></ion-icon></span>
            `
            console.log(pergExpandida);
    }
    aux.classList.add("expandida");
    const nome = aux.innerText;
    console.log(nome);
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

        </div>
    `
    console.log(aux.innerHTML)
}


function criarPerguntas(){
    limparMain();
    let auxiliar = `<header class="HPerg"><p class="perg">Crie suas perguntas</p></header>`; 
    for(let i = 1; i <= NPerg; i++){
        auxiliar += `
        <div class="container">
        <div class="perguntas">
            <p class="perg">Pergunta ${i}</p>
            <span onclick="montaPost(this)"><ion-icon name="create-outline"></ion-icon></span>
        </div>
        </div>
        `
    }
    MAIN.innerHTML = auxiliar + `<button class="finalizarPerg">Prosseguir para criar níveis</button>`;
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
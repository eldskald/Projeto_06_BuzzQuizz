//Essa funçao faz com que a tela 1 saia da tela e ainda vai adicionar a tela 3

function carregaTela3(){
    limparMain();
    telaInfoBasica();
} 

function verifTitulo(titulo){
    if(titulo.length >= 20 && titulo.length <= 65){
        console.log("valido")
        return true;
    }
    else{
        console.log("n valido")
        return false;
    }
}

function verifUrl(url){
    const pattern = "https://";
    if (url.includes(pattern)) {
        console.log("é url")    
        return true;
    }
    else {
        console.log("n é url")
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

function criarPerguntas(){
    limparMain();
}

function verificaInformacoes(){
    const titulo = document.querySelector(".title").value;
    const Url = document.querySelector(".urlIMG").value;
    const NPerg = Number(document.querySelector(".NPerguntas").value);
    const NNiveis = Number(document.querySelector(".NNiveis").value);
    
    const aux = verifTitulo(titulo);
    const aux2 = verifUrl(Url);
    const aux3 = verifNperguntas(NPerg);
    const aux4 = verifNiveis(NNiveis);

    if(aux && aux2 && aux3 && aux4){
        console.log("Tudo certo");
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
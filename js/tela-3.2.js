
function sucesso(elemento){
    MAIN.innerHTML = `
    <div class="sucesso">
        <header>
            <h3>Seu quizz está pronto!</h3>
        </header>

        <figure>
            <img src=${elemento.data.image}/>
                <figcaption>
                    ${elemento.data.title}
                </figcaption>
        </figure>

        <button class="prosseguir sucess" onclick="carregarTela2(${elemento.data.id})">Acessar Quizz</button>
        <div class="botao-retornar sucess" onclick="window.location.reload()">
            Voltar para o home
        </div>
    </div>
`
}


function salvarID(elemento){
    limparMain();
    sucesso(elemento);
    console.log(elemento);
    const idEChave = { id: elemento.data.id, chave: elemento.headers["secret-key"] };
    console.log(idEChave);
    let IdQuizzSalvos = JSON.parse(localStorage.getItem("IDS"))
    if(IdQuizzSalvos == null){
        const NID = [idEChave];
        const NIDString = JSON.stringify(NID);
        localStorage.setItem("IDS", NIDString);
    }
    else{
        IdQuizzSalvos.push(idEChave);
        const aux = JSON.stringify(IdQuizzSalvos);
        localStorage.setItem("IDS", aux);
    }
}


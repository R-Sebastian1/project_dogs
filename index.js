var paginaAtual = 1;
let input = '';
var limitPagina = 24;


/*Aqui faz o fetch para depois fazer a paginação*/
function getDogsData() {
  fetch(`http://localhost:3000/dogs?&_page=${paginaAtual}&_limit=${limitPagina}&name_like=${input}`)
  .then(response => {
    let itemsTotais = response.headers.get("X-Total-Count");
    paginasTotais = Math.ceil(itemsTotais / limitPagina);
    return response.json();
  })
  /*aqui verifica se tem algum cao encontrado, se sim, mostra o cao, se não, aparece a msg erro*/
  .then(dogs => {
    if (dogs.length === 0) {
      if (document.getElementById("caes").children.length > 0) { 
        document.getElementById("caes").replaceChildren();
        /*aqui aparecem os cães, caso verifique que o nome introduzido não é igual a nome, passa para baixo e apresenta erro */
      }
      var butoes=document.getElementById("paginas");
      butoes.style.display="none"
      mostrarErro();
    } else {
      if (document.getElementById("erro").children.length > 0) {
        document.getElementById("erro").replaceChildren();
        var butoes=document.getElementById("paginas");
        butoes.style.display="block";
        /*aqui faz ao contrario, tira o erro e mete os cães caso se pesquise por um nome certo*/
      }
      mostraPagina(dogs);
      updatePaginaAtual();
    }
  })
  .catch(error => console.log(error));
}

/*Aqui verifica se o input tem algum valor ou não, se não vai buscar a função showModal*/
let inputsearch = document.getElementById("searchText");
let searchButton = document.getElementById("buttonSearch");
searchButton.addEventListener("click", () => {
  if (!inputsearch.value) {
    showModal();
  }
  else {
    input = document.getElementById("searchText").value;
    paginaAtual = 1;
    getDogsData();
  }
});

/*Aqui faz-se a criação das paginas com toda a informação lá dentro: img, nome, e o botao "download"*//*Vai buscar a primeira função*/
function mostraPagina(dogs) {
  let firstDisplay = document.getElementById("caes");
  firstDisplay.className = "container-fluid";

  let div = document.createElement("div");
  div.className = "row";

  while (firstDisplay.firstChild) {
    firstDisplay.removeChild(firstDisplay.firstChild);
  }
    dogs.forEach(dogs => {
    console.log(dogs);

    let div1 = document.createElement("div");
    div1.className = "col-sm-6 col-md-4 col-lg-3 gy-2";

    let card = document.createElement("div");
    card.className = "card";

    let img = document.createElement("img");
    img.src = dogs.image.url;
    img.className = 'img';

    let footer = document.createElement("footer");
    footer.className = "footer";
    footer.textContent = dogs.name;
    let a = document.createElement("a");
    a.className = "a fa-solid fa-download float-right";
    a.href = dogs.image.url;
    a.target = "_blank";

    firstDisplay.appendChild(div);
    div.appendChild(div1);
    div1.appendChild(card);
    card.appendChild(img);
    card.appendChild(footer);
    footer.appendChild(a);
  })
}
getDogsData();

function myFunction() {
  var x = document.getElementById("isso");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}
/*Atualiza o texto com o numero da pagina correspondente */
function updatePaginaAtual() {
  let h3 = document.getElementById("numeroPagina");
  h3.innerText = paginaAtual;
}
/*botao back da pagina*/
function botaoBack() {
  if(paginaAtual===1){
    let back=document.getElementById("back");
    back.ariaInvalid;
  }
  else{
    paginaAtual--;
    getDogsData();
  }

}
/*botao next da pagina*/
function botaoNext() {
  if(paginaAtual===8){
    let next=document.getElementById("next");
    next.ariaInvalid;
  }
  else{
    paginaAtual++;
    getDogsData();
  }
}
/*o modal */
function showModal() {
  let modal = document.getElementById("exampleModalCenter");
  modal.style.display = "block";
  programarButaoFechar();
  programarButaoFecharX();
}

/*programação dos botoes para fechar o modal*/
function programarButaoFecharX() {
  let fechar = document.getElementById("fechar");
  let modal = document.getElementById("exampleModalCenter");
  fechar.addEventListener("click", () => {
    modal.style.display = "none";
  })
}
function programarButaoFechar() {
  let butaofechar = document.getElementById("butaofechar");
  let modal = document.getElementById("exampleModalCenter");
  butaofechar.addEventListener("click", () => {
    modal.style.display = "none";
  })
}
/*função que mostra o erro caso nao seja encontrado o cão*/
function mostrarErro() {
  let erro = document.getElementById("erro");
  erro.className = ("text-center");
  let column = document.createElement("div");
  column.className = ("erro1");
  let h1 = document.createElement("h1");
  h1.innerText = "Nothing to see here!";
  let icon = document.createElement("i");
  icon.className = "fa-solid fa-shield-dog";
  let h2 = document.createElement("h2");
  h2.innerText = "0 Results";

  erro.appendChild(column);
  column.appendChild(h1);
  column.appendChild(icon);
  column.appendChild(h2);
}

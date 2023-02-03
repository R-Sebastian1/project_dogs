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
    .then(dogs => {
      mostraPagina(dogs);
      updatePaginaAtual();
    })
    .catch(error => console.log(error));
}

/*Aqui é uma função parecida mas quando introduzes nomes a sorte aparece o icon e texto a dizer nada encontrado*/
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

function teste1() {
  console.log("erjkr")
}

/*Aqui faz-se a criação das paginas com toda a informação lá dentro: img, nome, e o botao "download"*/
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



function updatePaginaAtual() {
  let h3 = document.getElementById("numeroPagina");
  h3.innerText = paginaAtual;
}

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

function showModal() {
  let modal = document.getElementById("exampleModalCenter");
  modal.style.display = "block";
  programarButaoFechar();
  programarButaoFecharX();
}

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

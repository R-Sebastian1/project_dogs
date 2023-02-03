let paginaAtual=1;
let input='';
let limitPagina=24;


/*Aqui faz o fetch para depois fazer a paginação*/
  function getDogsData() {
    
      fetch(`http://localhost:3000/dogs?_page=${paginaAtual}&_limit=${limitPagina}&q=${input}`)
      .then(response =>{ 
        let itemsTotais=response.headers.get("x-total-count");
        paginasTotais=Math.ceil(itemsTotais/limitPagina);
        return response.json();
      })  
      .then(dogs => {
        mostraPagina(dogs);
      })
      .catch(error => console.log(error));
  }

/*Aqui é uma função parecida mas quando introduzes nomes a sorte aparece o icon e texto a dizer nada encontrado*/
  let inputsearch = document.getElementById("searchText");
  let searchButton = document.getElementById("buttonSearch");
  searchButton.addEventListener("click",()=>{
    if (!inputsearch.value) {
      showModal();
    } 
    else {
      input = document.getElementById("searchText").value;
      paginaAtual = 1;
      getDogsData();
    }
  });

  /*Aqui faz-se a criação das paginas com toda a informação lá dentro: img, nome, e o botao "download"*/
function mostraPagina(dogs){
  let firstDisplay=document.getElementById("caes");
  firstDisplay.className="container-fluid";

  let div=document.createElement("div");
    div.className="row";

  while(firstDisplay.firstChild){
    firstDisplay.removeChild(firstDisplay.firstChild);
  }

  dogs.forEach(dogs=>{
    console.log(dogs);

    let div1=document.createElement("div");
    div1.className="col-sm-6 col-md-4 col-lg-3 gy-2";

    let card=document.createElement("div");
    card.className="card";

    let img=document.createElement("img");
    img.src=dogs.image.url;
    img.className='img';

    let footer=document.createElement("footer");
    footer.className="footer";
    footer.textContent=dogs.name;
    let a=document.createElement("a");
    a.className="a fa-solid fa-download float-right";
      a.href=dogs.image.url;
      a.target="_blank";    
    
      firstDisplay.appendChild(div);
      div.appendChild(div1);
      div1.appendChild(card);
      card.appendChild(img);
      card.appendChild(footer);
      footer.appendChild(a);
  })
}
getDogsData();
butaoPaginas();

function myFunction() {
  var x = document.getElementById("isso");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}

function butaoPaginas(){
  let paginas=document.getElementById("paginas");
  paginas.classList.add("container-fluid","sticky-bottom");
  let paginas1=document.createElement("div");
  paginas1.classList.add("column");
  let paginastext=document.createElement("h3");
  paginastext.innerHTML=paginaAtual;

  let butaoAnterior=document.createElement("button");
  butaoAnterior.innerText="Back";
  butaoAnterior.classList.add("btn", "btn-primary");

  butaoAnterior.addEventListener("click",()=>{
    paginaAtual--;
    getDogsData();
  })

  let butaoSeguinte=document.createElement("button");
  butaoSeguinte.innerText="Next";
  butaoSeguinte.classList.add("btn", "btn-primary");
  
  butaoSeguinte.addEventListener("click",()=>{
    paginaAtual++;
    getDogsData();
  })
  paginas.appendChild(paginas1);
  paginas1.appendChild(butaoAnterior);
  paginas1.appendChild(paginastext);
  paginas1.appendChild(butaoSeguinte);
}

function showModal(){
 let modal=document.getElementById("exampleModalCenter");
 modal.style.display="block";
 programarButaoFechar();
 programarButaoFecharX();
}

function programarButaoFecharX() {
  let fechar=document.getElementById("fechar");
  let modal=document.getElementById("exampleModalCenter");
  fechar.addEventListener("click",()=>{
    modal.style.display="none";
  })
}
function programarButaoFechar(){
  let butaofechar=document.getElementById("butaofechar");
  let modal=document.getElementById("exampleModalCenter");
  butaofechar.addEventListener("click",()=>{
    modal.style.display="none";
  })
}

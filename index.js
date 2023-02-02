let paginaAtual=1;
let input="";

/*Aqui faz o fetch para depois fazer a paginação*/
  function getDogsData() {
    
      fetch(`http://localhost:3000/dogs?_page=${paginaAtual}&_limit=12&q=${input}`)
      .then(response => response.json())  
      .then(dogs => {
        mostraPagina(dogs);
      })
      .catch(error => console.log(error));
  }
/*Aqui temos o search box e o botão para fazer a pesquisa*/
  let inputsearch = document.getElementById("searchText");
  let searchButton = document.getElementById("button");
  let modal=document.getElementById("exampleModalCenter");

  searchButton.addEventListener("click", () => {

  if (!inputsearch.value) {
    /*Aqui aparece o modal, top */
    searchButton=document.getElementById("button");
    searchButton.onclick=function(){
      modal.style.display="block";
    }
    window.onclick=function(event){
      if(event.target==modal){
        modal.style.display="none";
      }
    } 
  } else{
    input = document.getElementById("searchText").value;
    currentPage = 1;
    getDogsData();
  }
  })
/*Aqui é uma função parecida mas quando introduzes nomes a sorte aparece o icon e texto a dizer nada encontrado*/
  let inputsearch1 = document.getElementById("searchText");
  let searchButton1 = document.getElementById("button");

  searchButton1.addEventListener("click", () => {

  if (inputsearch1.value!=getDogsData.name) {
    
    searchButton1=document.getElementById("button");
    searchButton1.onclick=function(){

      let erro=document.getElementById("erro");
      erro.className='small-4 medium-4 large-4 columns text-center';
      let erroTexto=document.createElement("h1");
      erroTexto.innerHTML='Nothing to see here! :/';
      let erroTexto1=document.createElement("h2");
      erroTexto1.innerHTML='0 Results';
      let imgErro=document.createElement("i");
      imgErro.className="i fa-solid fa-shield-dog fa-10x";
      imgErro.id='icon';
      erro.appendChild(erroTexto);
      erro.appendChild(imgErro);
      erro.appendChild(erroTexto1);
    }
  } else{
    while(erro.firstChild){
      erro.removeChild(erro.firstChild);
    }
    input = document.getElementById("searchText").value;
    currentPage = 1;
    getDogsData();
  }
  })

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
function myFunction() {
  var x = document.getElementById("isso");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}
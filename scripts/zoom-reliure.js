const cercles = document.getElementsByClassName("cercle");
const grands = document.getElementsByClassName("zoom-grand");
const petits = document.getElementsByClassName("zoom-petit");
const traits = document.getElementsByClassName("traits");

function afficherZoom(cible1, cible2, cible3, cible4) {
  for (let i = 0; i < cercles.length; i++) {
    cercles[i].classList.remove("active");
    grands[i].classList.remove("active");
    petits[i].classList.remove("active");
    traits[i].classList.remove("active");
  }
  cible1.classList.add("active");
  cible2.classList.add("active");
  cible3.classList.add("active");
  cible4.classList.add("active");
}

let text = document.createElement('p');

let userTouch = false ;

text.innerHTML = "Touchez les cercles pour découvrir les détails de la reliure."
text.className = "text_yellow"
document.body.appendChild(text);

const textYellow = document.querySelector("text_yellow");



for (let i = 0; i < cercles.length; i++) {
  cercles[i].addEventListener("click", () => {
    userTouch = true;
    afficherZoom(cercles[i], grands[i], petits[i], traits[i]);
    if(userTouch == true){
     document.body.removeChild(text);
}
  });
}

let boutonTermine = document.getElementsByClassName("bouton-termine");

const containerZoomReliure = document.getElementById('container-zoom-reliure');


boutonTermine[0].addEventListener("click", () =>
  window.location.href = '../html/ecran-fin-timeline.html'
)
let points;
let annees;
let tirets;
let descriptions;
let pointsBas;

document.addEventListener('DOMContentLoaded', () => {

  points = document.getElementsByClassName('point')
  annees = document.getElementsByClassName('annee')
  tirets = document.getElementsByClassName('vl')
  descriptions = document.getElementsByClassName('description')
  pointsBas = document.getElementsByClassName('pointBas')

  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let annee = annees[i];
    let tiret = tirets[i];
    let description = descriptions[i];
    let pointBas = pointsBas[i];
    point.addEventListener('click', function () {

      changerEtat(point, annee, tiret, description, pointBas);
    })
  }
})

function changerEtat(cible1, cible2, cible3, cible4, cible5) {
  for (let i = 0; i < points.length; i++) {
    annees[i].classList.remove('active')
    points[i].classList.remove('active')
    tirets[i].classList.remove('active')
    descriptions[i].classList.remove('active')
    pointsBas[i].classList.remove('active')
  }
  cible1.classList.add('active')
  cible2.classList.add('active')
  cible3.classList.add('active')
  cible4.classList.add('active')
  cible5.classList.add('active')
}

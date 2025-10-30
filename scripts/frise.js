let points;
let annees;
let tirets;
let descriptions;
let pointsBas;

document.addEventListener('DOMContentLoaded', () => {
  // Set the initial step-1 class when the page loads
  document.querySelector('ol').classList.add('step-1');

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
  const ol = document.querySelector('ol');

  // Enlève toutes les classes step
  ol.classList.remove('step-1', 'step-2', 'step-3', 'step-4', 'step-5');

  // Enlève la classe active de tous les éléments
  for (let i = 0; i < points.length; i++) {
    annees[i].classList.remove('active')
    points[i].classList.remove('active')
    tirets[i].classList.remove('active')
    descriptions[i].classList.remove('active')
    pointsBas[i].classList.remove('active')
  }

  // Rajoute la classe active à tous les éléments associés au point activé
  cible1.classList.add('active')
  cible2.classList.add('active')
  cible3.classList.add('active')
  cible4.classList.add('active')
  cible5.classList.add('active')

  // Rajoute la classe step correspondante à la frise selon le point activé
  const pointIndex = Array.from(points).indexOf(cible1);
  if (pointIndex >= 0 && pointIndex < 5) { // step-1 jusqu'à step-5
    ol.classList.add(`step-${pointIndex + 1}`);
  }
}
const gems = document.querySelectorAll('.gem');
const dropzones = document.querySelectorAll('.dropzone');

let draggedGem = null;
let offsetX = 0;
let offsetY = 0;

gems.forEach(gem => {
    const computedStyle = getComputedStyle(gem);
    gem.dataset.originalLeft = computedStyle.left;
    gem.dataset.originalTop = computedStyle.top;
    gem.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', drop);
    gem.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', drop);
});

function getEventPos(e) {
    if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else {
        return { x: e.clientX, y: e.clientY };
    }
}

function startDrag(e) {
    e.preventDefault();
    draggedGem = e.target;
    const pos = getEventPos(e);
    const rect = draggedGem.getBoundingClientRect();
    offsetX = pos.x - rect.left;
    offsetY = pos.y - rect.top;

    draggedGem.style.transition = 'none';
    draggedGem.style.cursor = 'grabbing';
    draggedGem.style.zIndex = 10;
}

function drag(e) {
    if (!draggedGem) return;
    e.preventDefault();
    const pos = getEventPos(e);

    const parentRect = draggedGem.parentElement.getBoundingClientRect();
    draggedGem.style.left = pos.x - offsetX - parentRect.left + 'px';
    draggedGem.style.top = pos.y - offsetY - parentRect.top + 'px';
}

function drop(e) {
    if (!draggedGem) return;

    let dropped = false;
    const gemRect = draggedGem.getBoundingClientRect();

    dropzones.forEach(zone => {
    const rect = zone.getBoundingClientRect();
    const gx = gemRect.left + gemRect.width / 2;
    const gy = gemRect.top + gemRect.height / 2;

    if (gx > rect.left && gx < rect.right && gy > rect.top && gy < rect.bottom) {
        
        const zoneRect = rect;
        let occupied = false;

        gems.forEach(g => {
            if (g !== draggedGem) {
                const gRect = g.getBoundingClientRect();
                const centerX = gRect.left + gRect.width / 2;
                const centerY = gRect.top + gRect.height / 2;

                if (centerX > zoneRect.left && centerX < zoneRect.right && centerY > zoneRect.top && centerY < zoneRect.bottom) {
                    occupied = true;
                }
            }
        });

        if (!occupied) {
            const parentRect = draggedGem.parentElement.getBoundingClientRect();
            draggedGem.style.left = rect.left - parentRect.left + rect.width / 2 - draggedGem.offsetWidth / 2 + 'px';
            draggedGem.style.top = rect.top - parentRect.top + rect.height / 2 - draggedGem.offsetHeight / 2 + 'px';
            dropped = true;
        } else {
            dropped = false;
        }
    }
});

    if (!dropped) {
        draggedGem.style.transition = 'left 0.3s ease, top 0.3s ease';
        draggedGem.style.left = draggedGem.dataset.originalLeft;
        draggedGem.style.top = draggedGem.dataset.originalTop;
    }

    draggedGem.style.cursor = 'grab';
    draggedGem.style.zIndex = 2;
    draggedGem = null;
}

window.addEventListener('load', () => {
    const hand = document.querySelector('.main');
    const firstGem = document.querySelector('.gem.bleue1');
    const firstDropzone = document.querySelector('.dropzone');
    const gems = document.querySelectorAll('.gem');

    hand.style.position = 'absolute';
    hand.style.opacity = 0; // main invisible au départ

    let handActive = true; // drapeau pour savoir si la main doit s'afficher

    function animateHand() {
        if (!handActive) return; // si on a déjà pris une pierre, ne plus afficher la main

        // Position initiale
        const gemRect = firstGem.getBoundingClientRect();
        const dropRect = firstDropzone.getBoundingClientRect();
        const parentRect = hand.parentElement.getBoundingClientRect();

        const offsetYStart = 100;
        const offsetXStart = 0;

        hand.style.left = (gemRect.left - parentRect.left - hand.offsetWidth + offsetXStart) + 'px';
        hand.style.top = (gemRect.top - parentRect.top - hand.offsetHeight + offsetYStart) + 'px';

        // Apparition de la main avec fondu
        setTimeout(() => {
            if (!handActive) return;

            hand.style.transition = 'opacity 1s ease';
            hand.style.opacity = 1;

            // Pause sur la position de départ
            setTimeout(() => {
                if (!handActive) return;

                hand.style.transition = 'left 1.5s ease, top 1.5s ease';
                
                const offsetXEnd = 5;
                const offsetYEnd = -60;

                hand.style.left = dropRect.left - parentRect.left + dropRect.width / 2 - hand.offsetWidth / 2 + offsetXEnd + 'px';
                hand.style.top = dropRect.top - parentRect.top + dropRect.height / 2 - hand.offsetHeight / 2 + offsetYEnd + 'px';

                // Disparition directement à la dropzone
                setTimeout(() => {
                    hand.style.transition = 'opacity 1s ease';
                    hand.style.opacity = 0;
                }, 1500);
            }, 500);
        }, 1000);
    }

    // Lancer la première animation
    animateHand();

    // Répéter toutes les 6 secondes
    const handInterval = setInterval(animateHand, 5000);

    // Désactiver la main dès qu'on commence à prendre une pierre
    gems.forEach(gem => {
        gem.addEventListener('mousedown', () => {
            if (handActive) {
                handActive = false;
                hand.style.transition = 'opacity 0.5s ease';
                hand.style.opacity = 0;
                clearInterval(handInterval); // arrêter la répétition de l'animation
            }
        });
        gem.addEventListener('touchstart', () => {
            if (handActive) {
                handActive = false;
                hand.style.transition = 'opacity 0.5s ease';
                hand.style.opacity = 0;
                clearInterval(handInterval);
            }
        }, { passive: false });
    });
});



// PARTIE FRISE



let points;
let annees;
let tirets;
let descriptions;
let pointsBas;

document.addEventListener('DOMContentLoaded', () => {

  // Set the initial step class when the page loads
  document.querySelector('ol').classList.add('step-4'); // "step" à changer selon la page active

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
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
                zone.classList.add('occupied');
            } else {
                dropped = false;
            }
        }
    });

    let allDropZonesOccupied = true;
    dropzones.forEach(zone => {
        if (!zone.classList.contains('occupied')) {
            allDropZonesOccupied = false;
        }
    });

    if (allDropZonesOccupied) {
        
    }

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
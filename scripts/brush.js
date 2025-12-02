const brush = document.getElementById('brush');
const reveal = document.getElementById('revealImage');
const circle = document.getElementById('circle');
const popup = document.getElementById('popup');
const main_brush = document.getElementById('main'); // le GIF de la main
let animating = false;

brush.addEventListener('click', () => {
  
  if (animating) return;
  animating = true;

  brush.classList.add('active');
  reveal.classList.add('active');

  // pinceau disparaît après 4s
  setTimeout(() => {
    brush.style.opacity = '0';
  }, 4000);

  // cercle apparaît juste après
  setTimeout(() => {
    circle.classList.add('visible');

    // main apparaît 1s après le cercle
    setTimeout(() => {
      main.classList.add('visible');
    }, 1000);

    document.querySelector('#point-3').classList.add('next');

  }, 4000);

  // réinitialisation animating
  setTimeout(() => {
    animating = false;
  }, 4500);
});



// clic sur le cercle => popup visible
circle.addEventListener('click', () => {
  setTimeout(() => {
    main_brush.style.transition = 'opacity 1s';
    main_brush.style.opacity = '0';
  }, 5000);
  popup.classList.add('visible');
});

// popup toggle
document.addEventListener("DOMContentLoaded", () => {
  const circle = document.getElementById("circle");
  const popup = document.getElementById("popup");

  let popupVisible = false;

  circle.addEventListener("click", () => {
    popupVisible = !popupVisible;

    if (popupVisible) {
      popup.classList.add("visible");
    } else {
      popup.classList.remove("visible");
    }
  });
});

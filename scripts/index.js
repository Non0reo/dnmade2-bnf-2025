document.addEventListener('DOMContentLoaded', () => {
  fetch('../public/data/data.json')
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('#title').textContent = data.title;

      gsap.fromTo(
        '#title',
        {
          opacity: 0,
        },
        {
          duration: 3,
          opacity: 1,
        }
      );

      document.querySelector('#annee-1').textContent = data.annees[0].date
      document.querySelector('#annee-2').textContent = data.annees[1].date
      document.querySelector('#annee-3').textContent = data.annees[2].date
      document.querySelector('#annee-4').textContent = data.annees[3].date
      document.querySelector('#annee-5').textContent = data.annees[4].date

      document.querySelector('#description-1').textContent = data.annees[0].description
      document.querySelector('#description-2').textContent = data.annees[1].description
      document.querySelector('#description-3').textContent = data.annees[2].description
      document.querySelector('#description-4').textContent = data.annees[3].description
      document.querySelector('#description-5').textContent = data.annees[4].description

    });
});

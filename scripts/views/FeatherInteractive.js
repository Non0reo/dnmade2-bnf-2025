/* let json
fetch('../public/data/step-1.json')
  .then((response) => response.json())
  .then((step1) => {
    json = step1
  }) */

document.addEventListener('DOMContentLoaded', start)

function start() {
  const imgContainer = document.querySelector('.image')
  const mainImage = document.getElementById('mainImage')
  const overlay = document.getElementById('overlay')
  const feather = document.getElementById('feather')
  
  const sideImage = document.createElement('img')
  sideImage.src = '../public/images/zoom.webp'
  sideImage.alt = 'Deuxième manuscrit'
  sideImage.style.display = 'none'
  sideImage.classList.add('side-image')
  imgContainer.appendChild(sideImage)
  
  // Créer l'élément vidéo/GIF
  const videoGif = document.createElement('img')
  videoGif.src = '../public/images/HandAnimationFinal-2.gif' // Remplacez par le chemin de votre GIF
  videoGif.alt = 'Animation'
  videoGif.style.display = 'none'
  videoGif.classList.add('video-gif')
  imgContainer.appendChild(videoGif)
  
  let visible = false
  let overlayAnimating = false
  let featherUsed = false
  
  feather.addEventListener('click', () => {
    if (overlayAnimating) return
    overlayAnimating = true
    feather.style.cursor = 'default'
    
    const imageRect = mainImage.getBoundingClientRect()
    const featherRect = feather.getBoundingClientRect()
    const startTime = Date.now()
    const duration = 4000
    const startY = 100
    const distanceToTravel = imageRect.height - 120
    
    function animate() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const revealHeight = imageRect.height * eased
      overlay.style.clipPath = `inset(${revealHeight}px 0 0 0)`
      
      // Déplacer la plume en synchronisation avec le rideau
      const featherY = distanceToTravel * eased
      feather.style.transform = `translateY(${featherY}px)`
      
      // Commencer à faire disparaître la plume dans les derniers 25% de l'animation
      if (progress > 0.75) {
        const fadeProgress = (progress - 0.75) / 0.25
        feather.style.opacity = 1 - fadeProgress
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        overlay.style.transition = 'opacity 1.5s ease'
        overlay.style.opacity = '0'
        
        setTimeout(() => {
          overlay.style.display = 'none'
          overlay.style.opacity = '1' // reset
          overlayAnimating = false
          feather.classList.add('hidden')
          featherUsed = true
          mainImage.style.cursor = 'pointer'
          
          // Afficher le GIF/vidéo après que le rideau soit complètement baissé
          videoGif.style.display = 'block'
          requestAnimationFrame(() => {
            videoGif.style.opacity = 1
            videoGif.style.transform = 'scale(1)'
          })
          
          // Cacher le GIF après 3 secondes (optionnel)
/*           setTimeout(() => {
            videoGif.style.opacity = 0
            setTimeout(() => {
              videoGif.style.display = 'none'
            }, 500)
          }, 5000) */

          document.querySelector('#point-2').classList.add('next');
          
        }, 1500)
      }
    }
    animate()
  })
  
  mainImage.addEventListener('click', (event) => {
    event.stopPropagation()
    if (!visible && !overlayAnimating && featherUsed) {
      sideImage.style.display = 'block'
      requestAnimationFrame(() => {
        sideImage.style.opacity = 1
        sideImage.style.transform = 'scale(1) rotate(0deg)'
      })
      visible = true

      videoGif.style.display = "none" ;
    }
  })
  
  document.addEventListener('click', () => {
    if (visible && !overlayAnimating && featherUsed) {
      sideImage.style.opacity = 0
      sideImage.style.transform = 'scale(0.98) rotate(0deg)'
      setTimeout(() => {
        sideImage.style.display = 'none'
      }, 400)
      visible = false

      videoGif.style.display = "flex" ;
    }
  })
}
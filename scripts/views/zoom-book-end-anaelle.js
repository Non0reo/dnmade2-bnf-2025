// Anaelle

//chargement de l page

let loadingScreen

window.addEventListener("load", () => {

  gsap.fromTo(
   loadingScreen,
   {
    opacity:1,
    display : "flex"
   },
   {
    opacity:0,
    display: "none",
   }
  )

})

// récupération des éléments

let previewSpanEl
let  previewBookContainerEl 
let containerEl
let imageEl;
let titleEl;
let tutorielText;
let isTitleOn = false;

let zoomIndex = 0;

// plein écran et premiere action
let fullScreen = true

 function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
} 

// start


window.addEventListener('DOMContentLoaded', () => {

  loadingScreen = document.querySelector(".loading-screen-black");

  containerEl = document.getElementById('zoom-book-end-container')
  imageEl = document.getElementById('zoom-book-end-image')
  titleEl = document.querySelector(".zoom-title-tuto");
  const zoomInButton = document.getElementById('zoom-book-end-zoom-in-button')
  const zoomOutButton = document.getElementById('zoom-book-end-zoom-out-button')

  titleEl.style.display = "none";


  const rect = containerEl.getBoundingClientRect()

  previewSpanEl = document.querySelector('#zoom-book-end-preview span')
 previewBookContainerEl = document.querySelector('#zoom-book-end-preview')


previewBookContainerEl.style.width = rect.width / 4 + 'px'
previewBookContainerEl.style.height = rect.height / 4 + 'px'

function zoom() {

  tutorielText = document.querySelector(".zoom-book-end-text-tuto")

  tutorielText.style.opacity = "0"
  tutorielText.style.transition = "all 0.2s ease-in-out"

   setTimeout(() => {
  tutorielText.style.display = "none";
   },500)

  
  // Instant finish previous zoom
  tl.totalProgress(1)

  // Get the target scroll position (from 0 to 1)
  const target = getZoomTarget()

  // Set the new width & height of the image
  const width = sizes.defaultWidth * sizes.scale + 'px'
  const height = sizes.defaultHeight * sizes.scale + 'px'

  // Set the new width & height with gsap animation
  tl.to(imageEl, {
    width,
    height,
    onStart: () => containerEl.classList.add('zoomed'),
    onUpdate: () => {
      // Get the total scroll size, that might have changed (in pixels)
      const scroll = {
        width: containerEl.scrollWidth,
        height: containerEl.scrollHeight,
      }

      // Get the target scroll position in the container (in pixels)
      const left = target.x * scroll.width - vpOrigin.x
      const top = target.y * scroll.height - vpOrigin.y

      // Scroll to the target position
      containerEl.scrollTo({
        left,
        top,
        behavior: 'instant',
      })
    },
  })
}


const SCALE_SIZES = [1, 2, 3, 4, 5]

const vp = {
  width: window.innerWidth,
  height: window.innerHeight,
}
// Get the viewport origin (the center of the screen, in pixels)
const vpOrigin = {
  x: vp.width / 2,
  y: vp.height / 2,
}

  const sizes = {
    defaultWidth: 0,
    defaultHeight: 0,
    scale: SCALE_SIZES[0],
  }

  const tl = gsap.timeline({
  duration: 0.5,
  ease: 'ease-in-out',
  })

  sizes.defaultHeight = imageEl.offsetHeight
  sizes.defaultWidth = imageEl.offsetWidth


  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)

function zoomIn() {
  if (zoomIndex + 1 > SCALE_SIZES.length - 1) return
  zoomIndex++

  sizes.scale = SCALE_SIZES[zoomIndex]

  zoom()
  resizePreview(zoomIndex)

  if(index=1){
    isTitleOn = true;
    titleEl.style.display = "flex";
  }
  else{
    isTitleOn = false;
    titleEl.style.display = "none";
  }
}

function getZoomTarget() {
  // Get the scrollable area size (in pixels)
  const scroll = {
    width: containerEl.scrollWidth,
    height: containerEl.scrollHeight,
  }

  // Get the target scroll position (from 0 to 1)
  const target = { x: 0.5, y: 0.5 }

  // If the width is scrollable
  if (scroll.width) {
    // Get the center of the viewport in the container (in pixels)
    const vpX = containerEl.scrollLeft + vpOrigin.x

    // Convert the viewport position to a target position (from 0 to 1)
    target.x = vpX / scroll.width
  }

  // If the height is scrollable
  if (scroll.height) {
    // Get the center of the viewport in the container (in pixels)
    const vpY = containerEl.scrollTop + vpOrigin.y

    // Convert the viewport position to a target position (from 0 to 1)
    target.y = vpY / scroll.height
  }

  return target
}

function zoomOut() {
  if (zoomIndex - 1 < 0) return
  zoomIndex--

  sizes.scale = SCALE_SIZES[zoomIndex]

  zoom()
  resizePreview(zoomIndex)
}


  containerEl.addEventListener("touchstart", () => {
    if(isTitleOn){
   titleEl.style.opacity = "0"
   titleEl.style.transition = "all 0.2s ease-in-out"

   setTimeout(() => {
    titleEl.style.display = "none";
   },500)
    }


  }, {passive : true})



  containerEl.addEventListener(
    'scroll',
    () => {
      if (!fullScreen) {

        const target = getZoomTarget()

        let posX = target.x * 100
        let posY = target.y * 100

        if(zoomIndex <=1 ){
        previewSpanEl.style.left = `${posX}%`
        previewSpanEl.style.top = `${posY}%`
        }
        else if(zoomIndex == 2){
        previewSpanEl.style.left = `${clamp(posX, 45, 55)}%`
        previewSpanEl.style.top = `${clamp(posY,10,80)}%`
        }
        else{
        previewSpanEl.style.left = `${clamp(posX, 40, 60)}%`
        previewSpanEl.style.top = `${clamp(posY,5,85)}%`
        }


      }
    },
    { passive: true }
  )

function resizePreview(index) {


  let scalePreviewSize = [100, 50, 33.33, 25, 20]

  previewSpanEl.style.transition =
    'width 0.3s ease-in-out, height 0.3s ease-in-out'

  gsap.fromTo(
    previewSpanEl,
    {
      width: scalePreviewSize[index] + `%`,
      height: scalePreviewSize[index] + `%`,
    },
    {
      width: scalePreviewSize[index] + `%`,
      height: scalePreviewSize[index] + `%`,
    }
  )

  if (index <= 0) {
    fullScreen = true
    previewSpanEl.style.top = '50%'
    previewSpanEl.style.left = '50%'
    previewSpanEl.style.transform = 'translate(-50%, -50%)'
  }
  else {
    fullScreen = false
  }

  zoomIndex = index

}

})


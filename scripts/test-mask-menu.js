document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
  let homepage = document.querySelector("#homepage")
  let SideChapelleHomepage = document.querySelector("#chapelle-div");
SideChapelleHomepage.addEventListener('click', () => {
  let videoTuto = document.createElement('video');
  videoTuto.src = './public/videos/video_tuto.mp4';
  videoTuto.autoplay = true;
  videoTuto.style.position = "fixed";
  videoTuto.style.top = 0;
  videoTuto.style.left = 0;
  videoTuto.style.width = '100%';
  videoTuto.style.height = '100%';
  videoTuto.style.zIndex = 1000;
  videoTuto.style.backgroundColor = 'black';
  homepage.style.display = 'none';

  videoTuto.addEventListener('ended', () => {
    document.body.removeChild(videoTuto);
    window.location.href = './html/FeatherInteractive.html';


  });

  document.body.appendChild(videoTuto);
  });
  
})


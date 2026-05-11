const track = document.getElementById("image-track");

let isDragging = false;

const handleOnDown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
  isDragging = false;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  
  if (Math.abs(mouseDelta) > 5) {
    isDragging = true;
  }

  const maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" },
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" },
    );
  }
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

if (track) {
  track.addEventListener('click', (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  });
}

// --- LÓGICA DEL REPRODUCTOR DE MÚSICA MÁGICO ---
const contenedorMusica = document.querySelector(".contenedor-boton-magico") || document.getElementById("contenedor-boton-magico");
const botonMusica = document.getElementById("botonMusica");
const audioFondo = document.getElementById("audioFondo");
let estaSonando = false;

// Ahora escuchamos el clic en todo el contenedor para mayor facilidad
if (contenedorMusica && audioFondo && botonMusica) {
  // Volumen suave por defecto (30%)
  audioFondo.volume = 0.3;

  contenedorMusica.addEventListener("click", function () {
    if (estaSonando) {
      audioFondo.pause();
      botonMusica.innerHTML = "🎵";
      // Quitamos la intensidad de la energía
      contenedorMusica.classList.remove("musica-sonando");
    } else {
      audioFondo.play();
      botonMusica.innerHTML = "⏸️";
      // Intensificamos la energía
      contenedorMusica.classList.add("musica-sonando");
    }
    estaSonando = !estaSonando;
  });
}
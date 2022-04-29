// Création de la carte, vide à ce stade
let carte = L.map('carte', {
  center: [47.2608333, 2.4188888888888886], // Centre de la France
  zoom: 5,
  minZoom: 4,
  maxZoom: 19,
});

// Ajout des tuiles (ici OpenStreetMap)
// https://wiki.openstreetmap.org/wiki/Tiles#Servers
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(carte);

// Ajout de l'échelle
L.control.scale().addTo(carte);

// video
let etatLecteur;

function lecteurPret(event) {
  // event.target = lecteur
  event.target.setVolume(50);
}

function changementLecteur(event) {
  // event.data = état du lecteur
  etatLecteur = event.data;
}

let lecteur;

function onYouTubeIframeAPIReady() {
  lecteur = new YT.Player('video', {
    height: '390',
    width: '640',
    videoId: 'n9xhJrPXop4',
    playerVars: {
      color: 'white',
      enablejsapi: 1,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: lecteurPret,
      onStateChange: changementLecteur,
    },
  });
}

// Hauteur de la vidéo
const hauteurVideo = $('#video').height();

// Position Y de la vidéo
const posYVideo = $('#video').offset().top;

// Valeur declenchant la modification de l'affichage (choix "esthétique")
const seuil = posYVideo + 0.75 * hauteurVideo;

// Gestion du défilement
$('.scroller').scroll(function() {
  // Récupération de la valeur du défilement vertical
  const scroll = $('.scroller').scrollTop();
  // Classe permettant l'exécution du CSS
  $('#video').toggleClass(
    'scroll',
    etatLecteur === YT.PlayerState.PLAYING && scroll > seuil,
  );
});
 
// carrousel
const nbDiapos = 4;
let indexDiapo = 0;
const precedent = document.getElementById('precedent');
const suivant = document.getElementById('suivant');

// Variable globale
let index = 0;

// Gestion des événements
$('.point').click(function (e) {
  e.preventDefault();
  // Récupération index
  let indexN = $('.point').index(this);

  // Renouveller l'image
  $('#carrousel>img').eq(index).fadeOut(1000).end().eq(indexN).fadeIn(1000);
  $('.point').eq(index).removeClass('on').end().eq(indexN).addClass('on');

  // Mettre à jour l'index
index = indexN;
});
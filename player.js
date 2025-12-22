const audio = document.getElementById("audio");
const now = document.getElementById("now");
const controls = document.getElementById("controls");

let playlist = [];
let index = 0;
let mode = null;

const radios = {
  new: {
    name: "Новое Радио",
    url: "https://stream.newradio.ru/moscow.novoe.aacp"
  },
  night: {
    name: "Night Vibe",
    url: "https://radio.plaza.one/mp3"
  },
  techno: {
    name: "TechnoBase.FM",
    url: "https://listen.technobase.fm/tunein-mp3"
  }
};

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function playLocal(type) {
  mode = "playlist";
  controls.style.display = "block";

  playlist = shuffle([
    `music/${type}/track1.mp3`,
    `music/${type}/track2.mp3`,
    `music/${type}/track3.mp3`
  ]);

  index = 0;
  playTrack();
}

function playTrack() {
  audio.src = playlist[index];
  audio.play();
  now.textContent = "Local Playlist";
}

function nextTrack() {
  index++;
  if (index >= playlist.length) {
    playlist = shuffle(playlist);
    index = 0;
  }
  playTrack();
}

function prevTrack() {
  index = index > 0 ? index - 1 : playlist.length - 1;
  playTrack();
}

function playRadio(key) {
  mode = "radio";
  controls.style.display = "none";

  audio.src = radios[key].url;
  audio.play();
  now.textContent = radios[key].name;
}

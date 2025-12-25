const audio = document.getElementById("audio");
const now = document.getElementById("now");

const playlists = {
  local: {
    name: "Local Mix",
    tracks: [
      "music/local/track01.mp3",
      "music/local/track02.mp3"
    ]
  },

  love: {
    name: "Love Radio (Local)",
    tracks: [
      "music/love/love01.mp3",
      "music/love/love02.mp3"
    ]
  }
};

const radios = {
  new: {
    name: "Новое Радио",
    url: "https://stream.newradio.ru/moscow.novoe.aacp"
  },
  techno: {
    name: "TechnoBase.FM",
    url: "https://listen.technobase.fm/tunein-mp3"
  },
  night: {
    name: "Night Vibe",
    url: "https://radio.plaza.one/mp3"
  }
};

let currentList = [];

function playPlaylist(key) {
  const list = playlists[key];
  if (!list) return;

  currentList = shuffle([...list.tracks]);
  playNext();
  now.textContent = list.name;
}

function playRadio(key) {
  const station = radios[key];
  if (!station) return;

  currentList = [];
  audio.src = station.url;
  audio.play();
  now.textContent = station.name;
}

function playNext() {
  if (currentList.length === 0) return;

  const track = currentList.shift();
  console.log("▶️ Playing:", track);
  audio.src = track;
  audio.play();
}

audio.addEventListener("ended", playNext);

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

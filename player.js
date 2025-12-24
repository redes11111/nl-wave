const audio = document.getElementById("audio");
const now = document.getElementById("now");

/* 🔹 Локальные плейлисты */
const playlists = {
  local: {
    name: "Local Mix",
    tracks: [
      "music/local/track01.mp3",
      "music/local/track02.mp3",
      "music/local/track03.mp3"
    ]
  },
  love: {
    name: "Love Radio (Local)",
    tracks: [
      "music/love/love01.mp3",
      "music/love/love02.mp3",
      "music/love/love03.mp3"
    ]
  }
};

/* 🔹 Онлайн радио */
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

/* ▶️ Локальные */
function playPlaylist(key) {
  const list = playlists[key];
  if (!list) return;

  currentList = shuffle([...list.tracks]);
  playNext();
  now.textContent = list.name;
}

/* ▶️ Онлайн */
function playRadio(key) {
  const station = radios[key];
  if (!station) return;

  currentList = [];
  audio.src = station.url;
  audio.load();
  audio.play().catch(() => {});
  now.textContent = station.name;
}

/* 🔁 Следующий локальный трек */
function playNext() {
  if (currentList.length === 0) return;
  audio.src = currentList.shift();
  audio.play().catch(() => {});
}

audio.addEventListener("ended", playNext);

/* 🔀 Рандом */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

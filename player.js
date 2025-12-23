const audio = document.getElementById("audio");
const now = document.getElementById("now");

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

let currentList = [];
let currentName = "";

function playPlaylist(key) {
  const list = playlists[key];
  if (!list) return;

  currentList = shuffle([...list.tracks]);
  currentName = list.name;

  playNext();
}

function playNext() {
  if (currentList.length === 0) return;

  const track = currentList.shift();
  audio.src = track;
  audio.play().catch(() => {});
  now.textContent = currentName;
}

audio.addEventListener("ended", playNext);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const player = document.getElementById("player");

const localTracks = {
  local: [
    "music/local1.mp3",
    "music/local2.mp3",
    "music/local3.mp3"
  ],
  love: [
    "music/love1.mp3",
    "music/love2.mp3",
    "music/love3.mp3"
  ]
};

function playLocal(type) {
  const tracks = localTracks[type];
  const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
  player.src = randomTrack;
  player.play();
}

function playStream(url) {
  player.src = url;
  player.play();
}

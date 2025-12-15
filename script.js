const stations = {
  love: "https://stream.love-radio.ru/love128",
  new: "https://icecast.newradio.ru/newradio",
  gaming: "https://streams.ilovemusic.de/iloveradio9.mp3",
  night: "https://streams.ilovemusic.de/iloveradio2.mp3",
  hard: "https://streams.ilovemusic.de/iloveradio6.mp3"
};

let audio = new Audio();
audio.volume = 0.8;

function playStation(key) {
  audio.src = stations[key];
  audio.play();
}

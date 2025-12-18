const audio = document.getElementById("audio");
const now = document.getElementById("now");

const stations = {
  love: {
    name: "Love Radio",
    url: "https://stream1.loveradio.ru/love128.mp3"
  },
  new: {
    name: "Новое Радио",
    url: "https://stream.newradio.ru/moscow.novoe.aacp"
  },
  gaming: {
    name: "Gaming Radio",
    url: "https://pub0101.101.ru/stream/pro/mp3/128/741960"
  },
  night: {
    name: "Night Vibe",
    url: "https://radio.plaza.one/mp3"
  },
  hard: {
    name: "Hard Mode",
    url: "https://stream.rcast.net/13988"
  }
};

function playRadio(key) {
  const station = stations[key];
  if (!station) return;

  audio.src = station.url;
  audio.pause();
  audio.load();
  audio.play().catch((error) => {
    console.error("Ошибка воспроизведения:", error);
  });
  now.textContent = station.name;
}

const audio = document.getElementById("audio");
const now = document.getElementById("now");

const stations = {
  love: {
    name: "Love Radio",
    url: "https://stream.loveradio.ru/loveradio96.mp3"
  },
  new: {
    name: "Новое Радио",
    url: "https://stream.newradio.ru/moscow.novoe.aacp"
  },
  gaming: {
    name: "Gaming Radio",
    url: "https://air.101.ru:8000/gaming_128"
  },
  night: {
    name: "Night Vibe",
    url: "https://streaming.radio.co/s88c9b1c98/listen"
  },
  hard: {
    name: "Hard Mode",
    url: "https://hardmode.fm/stream"
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

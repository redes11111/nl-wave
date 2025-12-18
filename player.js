const audio = document.getElementById("audio");
const now = document.getElementById("now");

const stations = {
  love: {
    name: "Love Radio",
    url: "http://net37.ru:8000/love_radio_net37ru.aac"
  },
  new: {
    name: "Новое Радио",
    url: "https://stream.newradio.ru/moscow.novoe.aacp"
  },
  power: {
    name: "Сила любви",
    url: "https://stream.powerapp.com.tr/powerlove/mp3;type=mp3"
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

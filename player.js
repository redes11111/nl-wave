const audio = document.getElementById("audio");
const now = document.getElementById("now");

const stations = {
  love: {
    name: "Love Radio",
    url: "https://stream2.loveradio.ru/stream.mp3"
  },
  new: {
    name: "Новое Радио",
    url: "https://stream.newradio.ru/moscow.novoe.aacp"
  },
  tht: {
    name: "THT Music Radio",
    url: "https://stream.tntmusic.ru/tnt.aac"
  },
  night: {
    name: "Night Vibe",
    url: "https://radio.plaza.one/mp3"
  },
  rekord: {
    name: "Радио Рекорд",
    url: "https://air.radiorecord.ru:8101/rr_320"
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

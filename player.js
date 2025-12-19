const audio = document.getElementById("audio");
const now = document.getElementById("now");

const stations = {
  record: {
    name: "Radio Record — EDM",
    url: "https://air.radiorecord.ru:8101/edm_320"
  },
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

function playRadio(key) {
  const station = stations[key];
  if (!station) return;

  audio.pause();
  audio.src = station.url;
  audio.load();

  audio.play()
    .then(() => {
      now.textContent = station.name;
    })
    .catch(err => {
      now.textContent = "Не удалось запустить поток";
      console.error("Play error:", err);
    });
}

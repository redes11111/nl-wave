const audio = document.getElementById("audio");
const now = document.getElementById("now");

const stations = {
  love: {
    name: "Love Radio",
    url: "https://icecast.vgtrk.cdnvideo.ru/loveradio_m.mp3"
  },
  new: {
    name: "Новое Радио",
    url: "https://stream.newradio.ru/moscow.novoe.aacp"
  },
  europa: {
    name: "Europa Plus",
    url: "http://emgregion.hostingradio.ru:8064/moscow.europaplus.mp3"
  },
  russkoe: {
    name: "Russkoe Radio",
    url: "http://dfm.hostingradio.ru/rusradio128.mp3"
  },
  retro: {
    name: "Retro FM",
    url: "http://retroserver.streamr.ru:8043/retro256.mp3"
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

const audio = document.getElementById("audio");
const now = document.getElementById("now");

const stations = {
  festival: {
    name: "DI.FM – Festival EDM",
    url: "https://streamingv2.shoutcast.com/di_festival_edm"
  },
  bigroom: {
    name: "DI.FM – Bass & Big Room",
    url: "https://streamingv2.shoutcast.com/di_bigroom"
  },
  new: {
    name: "Новое Радио",
    url: "https://stream.newradio.ru/moscow.novoe.aacp"
  },
  night: {
    name: "Night Vibe",
    url: "https://radio.plaza.one/mp3"
  }
};

function playRadio(key) {
  const station = stations[key];
  if (!station) return;

  audio.src = station.url;
  audio.load();
  audio.play().catch(e => console.log(e));
  now.textContent = station.name;
}

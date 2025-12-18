const audio = document.getElementById("audio");
const now = document.getElementById("now");
const playerDiv = document.getElementById("player");

const stations = {
  love: {
    name: "Love Radio",
    url: "https://stream2.loveradio.ru/stream.mp3" // Новый вариант, попробуй
  },
  new: {
    name: "Новое Радио",
    url: "https://stream.newradio.ru/moscow.novoe.aacp"
  },
  tht: {
    name: "THT Music Radio",
    embedHref: "https://radiopotok.ru/radio/1218",
    embedSrc: "https://radiopotok.ru/f/script.1/1218.js"
  },
  night: {
    name: "Night Vibe",
    url: "https://radio.plaza.one/mp3"
  },
  rekord: {
    name: "Радио Рекорд",
    embedHref: "https://radiopotok.ru/radio/67",
    embedSrc: "https://radiopotok.ru/f/script.1/67.js"
  }
};

function playRadio(key) {
  const station = stations[key];
  if (!station) return;

  // Очистка плеера
  playerDiv.innerHTML = '';
  audio.pause();
  audio.src = '';

  if (station.url) {
    // Для прямого стрима
    audio.src = station.url;
    audio.load();
    audio.play().catch((error) => console.error("Ошибка:", error));
  } else if (station.embedSrc) {
    // Для embed от radiopotok
    const rpDiv = document.createElement('div');
    rpDiv.className = 'RP-SCRIPT';
    const rpA = document.createElement('a');
    rpA.className = 'RP-LINK';
    rpA.href = station.embedHref;
    rpA.textContent = station.name;
    rpDiv.appendChild(rpA);
    playerDiv.appendChild(rpDiv);

    const script = document.createElement('script');
    script.defer = true;
    script.src = station.embedSrc;
    script.charset = 'UTF-8';
    playerDiv.appendChild(script);
  }

  now.textContent = station.name;
}

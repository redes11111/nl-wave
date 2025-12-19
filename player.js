const audio = document.getElementById("audio");
const now = document.getElementById("now");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let context, source, analyser, isAnimating = false;

const stations = {
  love: {
    name: "Love Radio",
    url: "https://icecast.vgtrk.cdnvideo.ru/loveradio_m.mp3"
  },
  new: {
    name: "Новое Радио",
    url: "https://stream.newradio.ru/moscow.novoe.aacp"
  },
  tht: {
    name: "THT Music Radio",
    url: "https://stream.tntmusic.ru/tntmusic.mp3"
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

audio.addEventListener("play", startVisual);
audio.addEventListener("pause", stopVisual);

function initAudioContext() {
  if (!context) {
    context = new (window.AudioContext || window.webkitAudioContext)();
    source = context.createMediaElementSource(audio);
    analyser = context.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(context.destination);
  }
}

function startVisual() {
  initAudioContext();
  isAnimating = true;
  animate();
}

function stopVisual() {
  isAnimating = false;
}

function animate() {
  if (!isAnimating) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (document.body.classList.contains('cyberpunk')) {
    drawCyberpunk(dataArray);
  } else {
    drawWaves(dataArray);
  }

  requestAnimationFrame(animate);
}

function drawWaves(data) {
  const width = canvas.width;
  const height = canvas.height;
  const centerY = height / 2;
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#00ffff';
  ctx.beginPath();
  ctx.moveTo(0, centerY);

  for (let i = 0; i < width; i++) {
    const percent = i / width;
    const index = Math.floor(percent * data.length);
    const amp = data[index] / 255 * 100 + 10; // Base wave + audio amp
    const y = amp * Math.sin(i * 0.01 + Date.now() * 0.001) + centerY; // Slow move + audio
    ctx.lineTo(i, y);
  }

  ctx.stroke();
}

function drawCyberpunk(data) {
  const width = canvas.width;
  const height = canvas.height;
  const barWidth = width / data.length;

  ctx.fillStyle = '#ff00de';
  for (let i = 0; i < data.length; i++) {
    const barHeight = (data[i] / 255) * height / 2;
    ctx.fillRect(i * barWidth, height - barHeight, barWidth - 2, barHeight);
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00ffff';
  }

  // Grid lines
  ctx.strokeStyle = '#00ffff';
  ctx.lineWidth = 1;
  for (let i = 0; i < height; i += 50) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();
  }
  for (let i = 0; i < width; i += 50) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }
}

function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('theme', theme);
}

// Load theme
const savedTheme = localStorage.getItem('theme') || 'default';
setTheme(savedTheme);

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

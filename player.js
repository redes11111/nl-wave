const audio = document.getElementById("audio");
const miniPlayer = document.getElementById("miniPlayer");
const trackName = document.getElementById("trackName");
const trackStatus = document.getElementById("trackStatus");
const progressBar = document.getElementById("progressBar");
const equalizer = document.getElementById("equalizer");
const playPauseBtn = document.getElementById("playPauseBtn");
const pauseIcon = document.getElementById("pauseIcon");
const playIcon = document.getElementById("playIcon");
const volIcon = document.getElementById("volIcon");
const muteIcon = document.getElementById("muteIcon");

const radios = {
    game: {
        name: "GAME ON",
        url: "https://radiorecord.hostingradio.ru/phonk96.aacp"
    },
    chill: {
        name: "CHILL FLOW",
        url: "https://radiorecord.hostingradio.ru/lofi96.aacp"
    },
    new: {
        name: "Новое Радио",
        url: "https://stream.newradio.ru/moscow.novoe.aacp"
    },
    techno: {
        name: "TechnoBase.FM",
        url: "https://listen.technobase.fm/tunein-mp3"
    }
};

let currentKey = null;

function playRadio(key) {
    const station = radios[key];
    if (!station) return;

    currentKey = key;
    audio.src = station.url;

    console.log("🔄 Загрузка радио:", station.name);
    showMiniPlayer(station.name, "Загрузка...");
    highlightStation(key);

    audio.play()
        .then(() => {
            console.log("✅ Радио запущено:", station.name);
            showMiniPlayer(station.name, "Playing");
            setPauseState(false);
        })
        .catch(e => {
            console.error("❌ Ошибка воспроизведения радио:", e);
            alert(`Не удалось подключиться к ${station.name}. Попробуйте другую станцию.`);
            hideMiniPlayer();
        });
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play()
            .then(() => setPauseState(false))
            .catch(e => console.error("❌ Ошибка возобновления:", e));
    } else {
        audio.pause();
        setPauseState(true);
    }
}

function toggleMute() {
    audio.muted = !audio.muted;
    volIcon.style.display = audio.muted ? "none" : "block";
    muteIcon.style.display = audio.muted ? "block" : "none";
    console.log(audio.muted ? "🔇 Звук выключен" : "🔊 Звук включен");
}

function setPauseState(isPaused) {
    pauseIcon.style.display = isPaused ? "none" : "block";
    playIcon.style.display = isPaused ? "block" : "none";
    trackStatus.textContent = isPaused ? "Paused" : "Playing";
    equalizer.classList.toggle("paused", isPaused);
}

function highlightStation(key) {
    document.querySelectorAll(".station-btn").forEach(btn => btn.classList.remove("playing"));
    const idx = Object.keys(radios).indexOf(key);
    document.querySelectorAll(".station-btn")[idx]?.classList.add("playing");
}

function showMiniPlayer(name, status) {
    trackName.textContent = name;
    trackStatus.textContent = status;
    miniPlayer.classList.add('active');
    console.log("📱 Мини-плеер показан:", name, "-", status);
}

function hideMiniPlayer() {
    miniPlayer.classList.remove('active');
    console.log("📱 Мини-плеер скрыт");
}

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    }
});

audio.addEventListener("error", (e) => {
    console.error("🚨 Ошибка аудио:", e);
    const station = radios[currentKey];
    if (station) {
        alert(`Ошибка воспроизведения ${station.name}. Проверьте подключение к интернету.`);
    }
    hideMiniPlayer();
});

audio.addEventListener("loadstart", () => console.log("⏳ Начата загрузка аудио..."));
audio.addEventListener("canplay", () => console.log("✅ Аудио готово к воспроизведению"));

console.log("🎵 NEXT WAVE Player загружен");
console.log("📻 Доступные радиостанции:", Object.keys(radios));

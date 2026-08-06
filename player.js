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
const playerCover = document.getElementById("playerCover");

// 🎵 Плейлисты — сюда позже добавим треки с Google Drive
const playlists = {
    game: {
        name: "Game On",
        icon: `<svg viewBox="0 0 24 24"><path d="M7.2 7h9.6c2 0 3.6 1.8 3.9 3.9l.6 4.2a2.3 2.3 0 01-4.1 1.8L15.8 15H8.2l-1.4 1.9a2.3 2.3 0 01-4.1-1.8l.6-4.2C3.6 8.8 5.2 7 7.2 7z"/></svg>`,
        tracks: [
            // { id: "GOOGLE_DRIVE_FILE_ID", name: "Название трека" }
        ]
    },
    chill: {
        name: "Chill Flow",
        icon: `<svg viewBox="0 0 24 24"><path d="M4 9h13v4.5A5.5 5.5 0 0111.5 19h-2A5.5 5.5 0 014 13.5V9z"/></svg>`,
        tracks: [
            // { id: "GOOGLE_DRIVE_FILE_ID", name: "Название трека" }
        ]
    }
};

const radios = {
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
let currentList = [];

function getGDriveDirectLink(fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

function playPlaylist(key) {
    const list = playlists[key];
    if (!list) return;

    if (list.tracks.length === 0) {
        console.log("📭 Треков пока нет:", list.name);
        alert(`В "${list.name}" пока нет треков. Добавь их через Google Drive!`);
        return;
    }

    currentList = shuffle([...list.tracks]);
    playerCover.innerHTML = list.icon;
    playNextTrack(list.name);
}

function playNextTrack(listName) {
    if (currentList.length === 0) {
        hideMiniPlayer();
        return;
    }
    const track = currentList.shift();
    const url = getGDriveDirectLink(track.id);

    console.log("▶️ Трек:", track.name);
    showMiniPlayer(track.name, "Загрузка...");

    audio.src = url;
    audio.play()
        .then(() => {
            showMiniPlayer(track.name, "Playing");
            setPauseState(false);
        })
        .catch(e => {
            console.error("❌ Ошибка трека:", e);
            alert(`Не удалось загрузить "${track.name}"`);
            playNextTrack(listName);
        });
}

function playRadio(key) {
    const station = radios[key];
    if (!station) return;

    currentKey = key;
    currentList = [];
    playerCover.innerHTML = key === "new"
        ? `<svg viewBox="0 0 24 24"><path d="M4 10c0-1.1.9-2 2-2h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7z"/></svg>`
        : `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>`;

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
}

function setPauseState(isPaused) {
    pauseIcon.style.display = isPaused ? "none" : "block";
    playIcon.style.display = isPaused ? "block" : "none";
    trackStatus.textContent = isPaused ? "Paused" : "Playing";
    equalizer.classList.toggle("paused", isPaused);
}

function highlightStation(key) {
    document.querySelectorAll(".station-btn").forEach(btn => btn.classList.remove("playing"));
}

function showMiniPlayer(name, status) {
    trackName.textContent = name;
    trackStatus.textContent = status;
    miniPlayer.classList.add('active');
}

function hideMiniPlayer() {
    miniPlayer.classList.remove('active');
}

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    }
});

audio.addEventListener("ended", () => {
    if (currentList.length > 0) {
        playNextTrack();
    } else {
        hideMiniPlayer();
    }
});

audio.addEventListener("error", (e) => {
    console.error("🚨 Ошибка аудио:", e);
    hideMiniPlayer();
});

console.log("🎵 NEXT WAVE Player загружен");
console.log("📻 Радио:", Object.keys(radios));
console.log("💿 Плейлисты (ждут треков):", Object.keys(playlists));

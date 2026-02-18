const audio = document.getElementById("audio");
const now = document.getElementById("now");
const miniPlayer = document.getElementById("miniPlayer");
const trackName = document.getElementById("trackName");
const progressBar = document.getElementById("progressBar");

const playlists = {
    local: {
        name: "Local Mix",
        tracks: [
            "music/local/HOLLYFLAME - Красками.mp3",
            "music/local/Post_Malone_Swae_Lee_-_Sunflower_59804834.mp3"
        ]
    },
    love: {
        name: "Love Radio (Local)",
        tracks: [
            "music/local/love/AudioCutter_ke(2).mp3",
            "music/local/love/AudioCutter_ke(3).mp3"
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
    },
    night: {
        name: "Night Vibe",
        url: "https://radio.plaza.one/mp3"
    }
};

let currentList = [];

function playPlaylist(key) {
    const list = playlists[key];
    if (!list) return;

    currentList = shuffle([...list.tracks]);
    console.log("Playlist tracks:", currentList);
    playNext();
    now.textContent = list.name;
    showMiniPlayer(list.name);
}

function playRadio(key) {
    const station = radios[key];
    if (!station) return;

    currentList = [];
    audio.src = station.url;
    audio.play().catch(e => console.error("Radio play error:", e));
    now.textContent = station.name;
    showMiniPlayer(station.name);
}

function playNext() {
    if (currentList.length === 0) return;

    const track = currentList.shift();
    console.log("▶️ Playing track:", track);
    audio.src = track;
    audio.play().catch(e => console.error("Track play error:", e));
}

function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    audio.src = "";
    currentList = [];
    now.textContent = "—";
    hideMiniPlayer();
}

function showMiniPlayer(name) {
    trackName.textContent = name;
    miniPlayer.classList.add('active');
}

function hideMiniPlayer() {
    miniPlayer.classList.remove('active');
}

// Обновление прогресс-бара
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + "%";
    }
});

// Автоматически скрывать плеер когда музыка закончилась
audio.addEventListener("ended", () => {
    if (currentList.length > 0) {
        playNext();
    } else {
        hideMiniPlayer();
        now.textContent = "—";
    }
});

// Показывать плеер когда начинается воспроизведение
audio.addEventListener("play", () => {
    miniPlayer.classList.add('active');
});

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

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
    }
};

const radios = {
    tnt: {
        name: "ТНТ Music Radio",
        url: "https://radiorecord.hostingradio.ru/tntmr128.mp3"
        // Альтернативные варианты, если первый не работает:
        // url: "http://nashe1.hostingradio.ru/tntmusic128.mp3"
        // url: "https://listen.181fm.com/181-90salt_128k.mp3"
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
    
    // Показываем индикатор загрузки
    showMiniPlayer(station.name + " (загрузка...)");
    
    audio.play()
        .then(() => {
            console.log("✅ Radio started:", station.name);
            showMiniPlayer(station.name);
            now.textContent = station.name;
        })
        .catch(e => {
            console.error("❌ Radio play error:", e);
            alert(`Не удалось подключиться к ${station.name}. Попробуйте другую станцию.`);
            hideMiniPlayer();
        });
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

// Обработка ошибок
audio.addEventListener("error", (e) => {
    console.error("Audio error:", e);
    const currentStation = Object.values(radios).find(r => r.url === audio.src);
    if (currentStation) {
        alert(`Ошибка воспроизведения ${currentStation.name}`);
        hideMiniPlayer();
    }
});

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

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
    console.log("📀 Playlist tracks:", currentList);
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
    console.log("🔄 Загрузка радио:", station.name);
    showMiniPlayer(station.name + " (загрузка...)");
    now.textContent = station.name + " (загрузка...)";
    
    audio.play()
        .then(() => {
            console.log("✅ Радио запущено:", station.name);
            showMiniPlayer(station.name);
            now.textContent = station.name;
        })
        .catch(e => {
            console.error("❌ Ошибка воспроизведения радио:", e);
            alert(`Не удалось подключиться к ${station.name}. Попробуйте другую станцию.`);
            hideMiniPlayer();
            now.textContent = "—";
        });
}

function playNext() {
    if (currentList.length === 0) return;

    const track = currentList.shift();
    console.log("▶️ Воспроизведение трека:", track);
    audio.src = track;
    audio.play()
        .then(() => {
            console.log("✅ Трек запущен успешно");
        })
        .catch(e => {
            console.error("❌ Ошибка воспроизведения трека:", e);
            alert("Не удалось воспроизвести трек. Попробуйте снова.");
        });
}

function stopAudio() {
    console.log("⏹️ Остановка воспроизведения");
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
    console.log("📱 Мини-плеер показан:", name);
}

function hideMiniPlayer() {
    miniPlayer.classList.remove('active');
    console.log("📱 Мини-плеер скрыт");
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
    console.log("🎵 Трек завершен");
    if (currentList.length > 0) {
        console.log("➡️ Переход к следующему треку");
        playNext();
    } else {
        console.log("📋 Плейлист завершен");
        hideMiniPlayer();
        now.textContent = "—";
    }
});

// Показывать плеер когда начинается воспроизведение
audio.addEventListener("play", () => {
    console.log("▶️ Воспроизведение начато");
    miniPlayer.classList.add('active');
});

// Обработка ошибок аудио
audio.addEventListener("error", (e) => {
    console.error("🚨 Ошибка аудио элемента:", e);
    const currentStation = Object.values(radios).find(r => r.url === audio.src);
    if (currentStation) {
        console.error("❌ Проблема с радиостанцией:", currentStation.name);
        alert(`Ошибка воспроизведения ${currentStation.name}. Проверьте подключение к интернету.`);
        hideMiniPlayer();
        now.textContent = "—";
    }
});

// Логирование при паузе
audio.addEventListener("pause", () => {
    console.log("⏸️ Воспроизведение приостановлено");
});

// Логирование загрузки
audio.addEventListener("loadstart", () => {
    console.log("⏳ Начата загрузка аудио...");
});

audio.addEventListener("canplay", () => {
    console.log("✅ Аудио готово к воспроизведению");
});

function shuffle(arr) {
    console.log("🔀 Перемешивание плейлиста");
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Дополнительная информация при загрузке страницы
console.log("🎵 NEXT WAVE Player загружен");
console.log("📻 Доступные радиостанции:", Object.keys(radios));
console.log("💿 Доступные плейлисты:", Object.keys(playlists));

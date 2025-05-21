// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Animação de preloader com coração pulsando
    showPreloader().then(() => {
        document.querySelector('.preloader').style.display = 'none';

        // Inicializar recursos
        initMusicPlayer();
        initGallery();
        startFloatingHearts();
    });

    // Animação de entrada de seções
    animateSectionsOnScroll();
});

function showPreloader() {
    return new Promise((resolve) => {
        const preloader = document.querySelector('.preloader');
        const heart = document.createElement('div');
        heart.classList.add('pulse-heart');
        preloader.appendChild(heart);

        const style = document.createElement('style');
        style.innerHTML = `
        .pulse-heart {
            width: 80px;
            height: 80px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: red;
            font-size: 60px;
            animation: pulse 1s infinite;
        }
        .pulse-heart::before {
            content: '❤️';
            display: block;
        }
        @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }`;
        document.head.appendChild(style);

        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                resolve();
            }, 500);
        }, 3000); // Tempo que o coração aparece
    });
}

function startFloatingHearts() {
    const container = document.querySelector('.floating-hearts');

    const style = document.createElement('style');
    style.innerHTML = `
    .floating-heart {
        position: absolute;
        animation: floatUp linear forwards;
        will-change: transform, opacity;
    }
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }`;
    document.head.appendChild(style);

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = '❤️';

        const size = Math.random() * 20 + 10;
        heart.style.fontSize = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.bottom = '0';
        heart.style.color = ['#ff6b9d', '#e60023', '#4a90e2', '#ff9999'][Math.floor(Math.random() * 4)];
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }

    setInterval(createHeart, 300);
}

// Função para inicializar o player de música
function initMusicPlayer() {
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playlistItems = document.querySelectorAll('.playlist-item');

    let currentTrack = 0;
    let isPlaying = false;
    let audio = new Audio();

    // Simular player (sem arquivos de áudio reais)
    function loadTrack(trackIndex) {
        currentTrack = trackIndex;
        const track = playlistItems[trackIndex];

        // Atualizar informações da música
        document.getElementById('track-title').textContent = track.getAttribute('data-title');
        document.getElementById('track-artist').textContent = track.getAttribute('data-artist');

        // Destacar música atual na playlist
        playlistItems.forEach(item => item.classList.remove('active'));
        track.classList.add('active');

        // Simular carregamento de áudio
        audio.src = track.getAttribute('data-src');
        audio.load();
    }

    function playTrack() {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        audio.play();
    }

    function pauseTrack() {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        audio.pause();
    }

    function nextTrack() {
        if (currentTrack < playlistItems.length - 1) {
            loadTrack(currentTrack + 1);
        } else {
            loadTrack(0);
        }
        if (isPlaying) playTrack();
    }

    function prevTrack() {
        if (currentTrack > 0) {
            loadTrack(currentTrack - 1);
        } else {
            loadTrack(playlistItems.length - 1);
        }
        if (isPlaying) playTrack();
    }

    // Event listeners
    playBtn.addEventListener('click', function () {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);

    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            loadTrack(index);
            playTrack();
        });
    });

    // Inicializar com a primeira música
    loadTrack(0);

    // Evento de fim de música
    audio.addEventListener('ended', nextTrack);
}

// Função para inicializar a galeria com lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            openLightbox(imgSrc);
        });
    });

    function openLightbox(imgSrc) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '9999';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'transform 0.3s ease';

        lightbox.appendChild(img);
        document.body.appendChild(lightbox);

        setTimeout(() => {
            img.style.transform = 'scale(1)';
        }, 10);

        lightbox.addEventListener('click', function () {
            img.style.transform = 'scale(0.9)';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        });
    }
}

function animateSectionsOnScroll() {
    const sections = document.querySelectorAll('section');
    function checkVisibility() {
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight * 0.75) {
                section.classList.add('visible');
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    window.addEventListener('scroll', debounce(checkVisibility));
    checkVisibility();
}

function debounce(func, wait = 10) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

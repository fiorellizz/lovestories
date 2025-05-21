// Preloader
document.addEventListener('DOMContentLoaded', function () {
    // Simular carregamento
    setTimeout(function () {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);

    // Inicializar player de música
    initMusicPlayer();

    // Inicializar corações flutuantes
    createFloatingHearts();

    // Inicializar galeria com lightbox
    initGallery();
});

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

// Função otimizada para criar corações flutuantes com detecção de Android
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const colors = ['#ff6b9d', '#e60023', '#4a90e2', '#ff9999'];

    // 🔍 Detecção de Android aprimorada
    let isAndroid = false;
    if (navigator.userAgentData) {
        isAndroid = navigator.userAgentData.platform === 'Android';
    } else {
        isAndroid = /Android/i.test(navigator.userAgent);
    }

    // Estilo de animação (uma vez só)
    if (!document.getElementById('floatingHeartsStyle')) {
        const style = document.createElement('style');
        style.id = 'floatingHeartsStyle';
        style.innerHTML = `
@keyframes floatUp {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-100vh) rotate(var(--rotate, 0deg)); opacity: 0; }
}`;
        document.head.appendChild(style);
    }

    let heartCount = 0;
    const maxHearts = isAndroid ? 20 : 50;
    const interval = isAndroid ? 1000 : 300;

    // 🧠 Scroll awareness para pausar criação de corações
    let isScrolling = false;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => isScrolling = false, 500);
    });

    function createHeart() {
        if (heartCount >= maxHearts) return;

        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        const fontSize = Math.random() * 20 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.5;
        const duration = isAndroid ? Math.random() * 2 + 3 : Math.random() * 5 + 5;
        const rotate = Math.random() * 360;

        heart.style.cssText = `
            position: absolute;
            font-size: ${fontSize}px;
            color: ${color};
            left: ${left}vw;
            top: 100vh;
            opacity: ${opacity};
            animation: floatUp ${duration}s linear forwards;
            --rotate: ${rotate}deg;
            will-change: transform, opacity;
            pointer-events: none;
        `;
        heart.textContent = '❤';

        container.appendChild(heart);
        heartCount++;

        setTimeout(() => {
            heart.remove();
            heartCount--;
        }, duration * 1000);
    }

    // 🧠 Loop com pausa durante scroll
    let lastTime = 0;

    function loop(timestamp) {
        if (!isScrolling && timestamp - lastTime >= interval) {
            createHeart();
            lastTime = timestamp;
        }
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
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

// Efeito de parallax no header
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;

    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Animação de entrada para elementos quando ficam visíveis
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');

    // ✅ Substitui checkVisibility() por IntersectionObserver
    function observeSections() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });
    }

    // Inicializar estilos
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Verificar visibilidade inicial e em scroll
    observeSections(); // chama ao carregar
    function debounce(func, wait = 10) {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }
    window.addEventListener('scroll', debounce(checkVisibility));
});
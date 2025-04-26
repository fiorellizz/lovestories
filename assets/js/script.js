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

    // Inicializar contador
    updateCountdown();

    // Inicializar player de música
    initMusicPlayer();

    // Inicializar corações flutuantes
    createFloatingHearts();

    // Inicializar galeria com lightbox
    initGallery();
});

// Função para atualizar o contador
function updateCountdown() {
    const startDate = new Date('2024-11-23');
    const currentDate = new Date();

    // Calcular diferença em meses
    let months = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
    months += currentDate.getMonth() - startDate.getMonth();

    // Calcular diferença em dias, horas e minutos
    const timeDiff = currentDate - startDate;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) % 30;
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // Atualizar elementos HTML
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;

    // Atualizar a cada minuto
    setTimeout(updateCountdown, 60000);
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

        // Simular capa do álbum (usando a primeira foto do casal)
        document.getElementById('album-cover').src = 'img/optimized/IMG_2714.jpeg';

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

// Função para criar corações flutuantes
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');

        // Estilo do coração
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.color = getRandomColor();
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.animation = `floatUp ${Math.random() * 5 + 5}s linear forwards`;
        heart.innerHTML = '❤';

        container.appendChild(heart);

        // Remover coração após a animação
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    function getRandomColor() {
        const colors = ['#ff6b9d', '#e60023', '#4a90e2', '#ff9999'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Criar corações a cada 300ms
    setInterval(createHeart, 300);

    // Adicionar estilo de animação
    const style = document.createElement('style');
    style.innerHTML = `
@keyframes floatUp {
0% {
transform: translateY(0) rotate(0deg);
}
100% {
transform: translateY(-100vh) rotate(${Math.random() * 360}deg);
}
}
`;
    document.head.appendChild(style);
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

    function checkVisibility() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Inicializar estilos
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Verificar visibilidade inicial e em scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});
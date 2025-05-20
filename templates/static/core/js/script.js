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

// Função para criar corações flutuantes
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const isAndroid = /Android/.test(navigator.userAgent);
    const heartPool = [];
    const maxHearts = isAndroid ? 15 : 30;
    let lastFrameTime = 0;
    const colors = ['#ff6b9d', '#e60023', '#4a90e2', '#ff9999'];
    
    // Pré-criar elementos e reutilizá-los
    function createHeartPool() {
        for(let i = 0; i < maxHearts; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤';
            heart.style.cssText = `
                position: absolute;
                will-change: transform, opacity;
                pointer-events: none;
                ${!isAndroid ? 'transform: translateZ(0);' : ''}
            `;
            heartPool.push({element: heart, active: false});
        }
    }
    
    function getAvailableHeart() {
        return heartPool.find(heart => !heart.active);
    }

    function animateHeart(heart) {
        const duration = Math.random() * 5 + 5;
        const startTime = Date.now();
        const startY = window.innerHeight;
        const endY = -100;
        const startX = Math.random() * window.innerWidth;
        const rotation = Math.random() * 360;
        
        heart.element.style.cssText += `
            left: ${startX}px;
            top: ${startY}px;
            font-size: ${Math.random() * 20 + 10}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            opacity: ${Math.random() * 0.5 + 0.5};
        `;
        
        function update() {
            const progress = (Date.now() - startTime) / (duration * 1000);
            if(progress > 1) {
                heart.active = false;
                heart.element.style.opacity = '0';
                return;
            }
            
            const y = startY + (endY - startY) * progress;
            const currentRotation = isAndroid ? 0 : rotation * progress;
            
            heart.element.style.transform = 
                `translateY(${y}px) rotate(${currentRotation}deg)`;
            
            requestAnimationFrame(update);
        }
        
        heart.active = true;
        container.appendChild(heart.element);
        requestAnimationFrame(update);
    }

    function spawnHeart() {
        const now = Date.now();
        if(now - lastFrameTime < 300) return;
        
        const heart = getAvailableHeart();
        if(heart) animateHeart(heart);
        lastFrameTime = now;
    }

    // Inicialização
    createHeartPool();
    const interval = setInterval(spawnHeart, 300);
    
    // Cleanup
    return () => {
        clearInterval(interval);
        heartPool.forEach(heart => heart.element.remove());
    };
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
// window.addEventListener('scroll', function () {
//     const hero = document.querySelector('.hero');
//     const scrollPosition = window.pageYOffset;

//     hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
// });

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
    function debounce(func, wait = 10) {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }
    window.addEventListener('scroll', debounce(checkVisibility));
});
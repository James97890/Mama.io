// Список комплиментов
const compliments = [
"Мама, ты — мой целый мир!",  
"Ты — сердце моего счастья!",  
"С тобой я чувствую себя дома!",  
"Ты — свет в моих самых тёмных днях!",  
"Твоя любовь — моя сила!",  
"Ты — мой нежный ангел!",  
"С тобой жизнь ярче и теплее!",  
"Ты умеешь слушать сердцем!",  
"Ты — моя опора в любой буре!",  
"Мама, ты — моё вдохновение!",  
"Ты — мой тихий остров спокойствия!",  
"Твоё сердце — океан любви!",  
"Ты даришь тепло даже молча!",  
"Ты — мой дом в этом мире!",  
"Твоя забота — самое дорогое!",  
"Ты — целая вселенная для меня!",  
"С тобой любое горе уходит!",  
"Ты наполняешь мой мир светом!",  
"Ты — моё ежедневное чудо!",  
"Мама, ты — часть моего сердца!",

];

// Создаем звезды
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createStars();
    const openBtn = document.getElementById('openBtn');

    openBtn.addEventListener('click', function() {
        document.querySelector('.intro-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.intro-screen').style.display = 'none';
            document.querySelector('.congrats-screen').classList.add('visible');
        }, 1000);

        // Увеличиваем интенсивность лепестков
        setInterval(createPetal, 300);
    });

    // Добавить в script.js
    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelector('.stars');
        const x = e.clientX / window.innerWidth * 10;
        const y = e.clientY / window.innerHeight * 10;
        stars.style.transform = `translate(${x}px, ${y}px)`;
    });


    // Обработчик для розы
    document.getElementById('bouquet-btn').addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY);
        for (let i = 0; i < 10; i++) setTimeout(createPetal, i * 100);
        showRandomCompliment();
    });

    // Начальные лепестки
    setInterval(createPetal, 1000);
});

// Функция создания частиц при клике
function createParticles(x, y) {
    const container = document.body;
    const count = 30; // Количество частиц

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Случайный размер частицы (от 5px до 10px)
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Случайный цвет частицы (оттенки розового и красного)
        const hue = Math.floor(Math.random() * 40) + 340; // от 340 до 380 (20) по шкале HSL
        const saturation = Math.floor(Math.random() * 30) + 70; // от 70% до 100%
        const lightness = Math.floor(Math.random() * 20) + 60; // от 60% до 80%
        particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        // Размещаем частицу в месте клика
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Задаем случайное направление и расстояние движения
        const tx = (Math.random() - 0.5) * 200; // Смещение по X (-100px до 100px)
        const ty = (Math.random() - 0.5) * 200; // Смещение по Y (-100px до 100px)
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        // Добавляем частицу на страницу
        container.appendChild(particle);

        // Удаляем частицу после завершения анимации
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

// Функция для создания лепестка
function createPetal() {
    const petal = document.createElement('img');
    // Используем data URI вместо файла для надежности
    petal.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 0 C20 10 25 15 15 30 C5 15 10 10 15 0" fill="%23ff6f61" opacity="0.7"/></svg>';
    petal.classList.add('petal');

    // Случайный размер лепестка (от 20px до 50px)
    const size = Math.floor(Math.random() * 30) + 20;
    petal.style.width = `${size}px`;

    // Случайная начальная позиция по X (в пределах ширины экрана)
    const x = Math.random() * window.innerWidth;
    petal.style.left = `${x}px`;

    // Начальная позиция по Y (над верхней границей экрана)
    petal.style.top = `-50px`;

    // Случайное направление вращения (влево или вправо)
    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    const rotationSpeed = Math.random() * 360; // Случайная скорость вращения

    // Случайное отклонение по горизонтали
    const horizontalDrift = (Math.random() - 0.5) * 200; // Отклонение от -100px до 100px

    // Добавляем лепесток в контейнер
    const petalsContainer = document.getElementById('petals-container');
    if (petalsContainer) {
        petalsContainer.appendChild(petal);
    }

    // Анимация падения
    const animationDuration = Math.random() * 3 + 2; // Случайная длительность падения (2-5 секунд)
    petal.style.animation = `fall ${animationDuration}s linear forwards`;

    // Управление отклонением по горизонтали
    petal.style.setProperty('--drift', `${horizontalDrift}px`);

    // Удаляем лепесток после завершения анимации
    petal.addEventListener('animationend', () => {
        petal.remove();
    });

    // Вращение лепестка
    let rotation = 0;
    const rotatePetal = () => {
        rotation += rotationSpeed * rotationDirection * 0.01;
        petal.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(rotatePetal);
    };
    requestAnimationFrame(rotatePetal);
}

// Функция для показа случайного комплимента
function showRandomCompliment() {
    const complimentElement = document.getElementById('compliment');
    if (!complimentElement) return;

    // Удаляем класс показа, если он есть
    complimentElement.classList.remove('show');

    // Ожидаем, пока анимация исчезновения завершится
    setTimeout(() => {
        // Выбираем случайный комплимент
        const randomIndex = Math.floor(Math.random() * compliments.length);
        complimentElement.textContent = compliments[randomIndex];

        // Добавляем класс для показа комплимента
        complimentElement.classList.add('show');
    }, 100); // Короткая задержка для сброса анимации
}

// Данные для медиа (10 элементов)
const mediaData = [
    {
        type: 'image',
        src: 'photo1.jpg',
        comment: 'Наша первая встреча — помнишь этот день? 🌸'
    },
{
    type: 'video',
    src: 'video1.mp4',
    muted: true,
    comment: `
        <p>Мамочка, любимая, мой свет родной,</p>
        <p>Ты — волшебство, что рядом со мной.</p>
        <p>Твои глаза сияют ярче всей Вселенной,</p>
        <p>С любовью смотрят — доброй, несравненной.</p>

        <p>От тебя идёт тепло и свет,</p>
        <p>Ты — мой рассвет, мой главный оберег.</p>
        <p>Ты — ангел, что спустился с высоты,</p>
        <p>Чтоб были рядом сказки и мечты.</p>

        <p>С тобой, как в раю — спокойно, легко,</p>
        <p>Ты лечишь без слов, обнимаешь глубоко.</p>
        <p>Ты — героиня, пусть без плаща,</p>
        <p>Но с сердцем отваги, с душой горячей.</p>

        <p>Спасибо за сказки, за тёплый обед,</p>
        <p>За поцелуй в лобик, за добрый совет.</p>
        <p>Я вырасту, мама, но не забываю —</p>
        <p>Ты — моё сердце, ты — родная моя.</p>

        <p>Спасибо, родная, за каждый день,</p>
        <p>За ласковый голос, что гонит тень.</p>
        <p>Я дочка твоя, и всегда повторю —</p>
        <p><strong>Мамочка, милая, я тебя люблю!</strong></p>
    `
}
        
    // Добавьте остальные 8 элементов...
];

let currentMediaIndex = 0;
let mediaElements = [];

// Предзагрузка медиа
function preloadMedia() {
    mediaData.forEach((item, index) => {
        if (item.type === 'image') {
            const img = new Image();
            img.src = item.src;
            img.onload = () => {
                mediaElements[index] = img;
            };
        } else {
            const video = document.createElement('video');
            video.src = item.src;
            video.muted = item.muted;
            video.preload = 'auto';
            mediaElements[index] = video;
        }
    });
}

// Показать текущее медиа
function showCurrentMedia() {
    const container = document.getElementById('media-display');
    // Остановить предыдущее видео и очистить контейнер
    container.querySelector('video')?.pause();
    container.innerHTML = '';

    const media = mediaElements[currentMediaIndex].cloneNode(true);
    media.classList.add('active');

    if (media.tagName === 'VIDEO') {
        // Автовоспроизведение с отключением звука (требование браузеров)
        media.autoplay = true;
        media.muted = true;
        media.setAttribute('playsinline', '');
        media.setAttribute('webkit-playsinline', '');
        media.loop = true;

        // Блокировка контекстного меню
        media.oncontextmenu = (e) => {
            e.preventDefault();
            return false;
        };

        // Принудительный запуск для мобильных устройств
        media.play().catch(error => {
            console.log('Автовоспроизведение заблокировано. Нужно взаимодействие пользователя.');
        });
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'media-wrapper';
    wrapper.appendChild(media);
    container.appendChild(wrapper);

    // Анимация комментария
const comment = document.getElementById('media-comment');
comment.classList.remove('show');
setTimeout(() => {
    comment.innerHTML = mediaData[currentMediaIndex].comment; // ← ВОТ ЭТА СТРОКА
    comment.classList.add('show');
}, 300);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    preloadMedia();

    document.getElementById('media-display').addEventListener('click', (e) => {
        e.preventDefault(); // Блокировка стандартных действий
        currentMediaIndex = (currentMediaIndex + 1) % mediaData.length;
        showCurrentMedia();
    });

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', function() {
        document.querySelector('.congrats-screen').classList.remove('visible');
        document.querySelector('.memories-screen').style.display = 'block';
        showCurrentMedia();
    });

    // Инициализация кнопки (изначально скрыта)
    nextBtn.style.display = 'none';
});

// В обработчике открытия поздравления покажите кнопку:
openBtn.addEventListener('click', function() {
    document.querySelector('.intro-screen').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.intro-screen').style.display = 'none';
        document.querySelector('.congrats-screen').classList.add('visible');
        document.getElementById('nextBtn').style.display = 'block'; // Показываем кнопку
    }, 1000);
});

function preloadMedia() {
    mediaData.forEach((item, index) => {
        if (item.type === 'image') {
            const img = new Image();
            img.src = item.src;
            img.onload = () => mediaElements[index] = img;
            img.onerror = () => console.error("Ошибка загрузки:", item.src); // Добавьте это
        } else {
            const video = document.createElement('video');
            video.src = item.src;
            video.muted = item.muted;
            video.preload = 'auto';
            video.onerror = () => console.error("Ошибка загрузки:", item.src); // И это
            mediaElements[index] = video;
        }
    });
}



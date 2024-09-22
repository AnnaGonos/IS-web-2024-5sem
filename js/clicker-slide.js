// получаем необходимые элементы
const smallImgs = document.querySelectorAll('.flower__image-gallery_small-img');
const bigImg = document.querySelector('.flower__image-gallery_big-img');
const bigImageContainer = document.querySelector('.flower__image-gallery_big-container');

// счетчик кликов и флаг полноэкранного режима
let isFullScreen = false;

// обработчик клика на маленькие изображения
smallImgs.forEach(img => {
    img.addEventListener('click', () => {
        // меняем источник большого изображения
        bigImg.src = img.src;
        bigImg.classList.add('active');

        // переключаем полноэкранный режим
        toggleFullScreen();
    });
});

// функция для переключения на полноэкранный режим
function toggleFullScreen() {
    if (!isFullScreen) {
        // переход в полноэкранный режим
        bigImageContainer.classList.add('full-screen');
        document.body.classList.add('overflow-hidden');
    } else {
        // выход из полноэкранного режима
        bigImageContainer.classList.remove('full-screen');
        document.body.classList.remove('overflow-hidden');
    }
    isFullScreen = !isFullScreen;
}

// обработчик клика вне большого изобр для выхода из полноэкранного режима
document.addEventListener('click', (event) => {
    if (isFullScreen && !bigImageContainer.contains(event.target)) {
        toggleFullScreen();
    }
});

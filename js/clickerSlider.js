var swiper = new Swiper('.swiper-container', {
    loop: true, // Позволяет зацикливать слайды
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //     dynamicBullets: true,
    //     renderBullets: function (index, className) {
    //         return '<span class="' + className + '">' + (index + 1) + '</span>';
    //     },
    // },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
    },

    simulateTouch: true,
    touchRatio: 5,
    touchAngle: 45,
    grabCursor: true,

    slideToClickedSlide: true,

    hashNavigation: {
        watchState: true,
    },

    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },

    mousewheel: {
        sensitivity: 1,
        // eventsTarget: ".image-slider"
    },

    autoHeight: true,
    slidesPerView: 1,
});
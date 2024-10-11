document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переменной, отвечающей за текущий индекс слайда
    var slideIndex = 0;
    // Вызов функции, отображающей слайды
    showSlides();

    // Функция, отображающая слайды
    function showSlides() {
        var i;
        // Получение всех элементов со слайдами
        var slides = document.getElementsByClassName("slider__slide");
        // Получение всех элементов с точками-индикаторами
        var dots = document.getElementsByClassName("slider__dot");

        // Скрытие всех слайдов
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Увеличение индекса текущего слайда
        slideIndex++;
        // Если индекс превышает количество слайдов, сбрасываем его на 1
        if (slideIndex > slides.length) {slideIndex = 1}

        // Удаление класса "active" со всех точек-индикаторов
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" slider__dot--active", "");
        }

        // Отображение текущего слайда
        slides[slideIndex-1].style.display = "block";
        // Добавление класса "active" к текущей точке-индикатору
        dots[slideIndex-1].className += " slider__dot--active";

        // вызываем функцию showSlides через 5 секунд (автоматическая смена слайдов)
        setTimeout(showSlides, 4000);
    }
});
window.addEventListener('scroll', function() {
    var headerMiddle = document.querySelector('.header__navigation-section');
    var headerMiddlePosition = headerMiddle.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (headerMiddlePosition < windowHeight) {
        headerMiddle.classList.add('sticky');
    } else {
        headerMiddle.classList.remove('sticky');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var moreIcon = document.querySelector('.header__more-icon');
    var searchDropdown = document.querySelector('.header__search-dropdown');

    moreIcon.addEventListener('click', function() {
        searchDropdown.classList.toggle('show');
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.header__more-icon') && !event.target.closest('.header__search-dropdown')) {
            searchDropdown.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.querySelector('.header__menu-toggle');
    var menuDropdown = document.querySelector('.header__menu-dropdown');

    menuToggle.addEventListener('click', function() {
        menuDropdown.classList.toggle('show');
    });

    window.addEventListener('click', function(event) {
        if (!event.target.closest('.header__menu-toggle')) {
            menuDropdown.classList.remove('show');
        }
    });
});
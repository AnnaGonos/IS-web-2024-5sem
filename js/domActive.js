function highlightActiveMenuItem() {
    let currentPage = window.location.pathname.split("/").pop();

    const menuMapping = {
        "catalog-page.html": ["КАТАЛОГ"],
        "delivery.html": ["ДОСТАВКА"],
        "reviews.html": ["ОТЗЫВЫ"],
    };

    // получаем все элементы меню
    let menuItems = document.querySelectorAll(".header__link");

    menuItems.forEach(item => {
        let itemText = item.querySelector("h5").innerText.trim();

        if (menuMapping[currentPage] && menuMapping[currentPage].includes(itemText)) {
            item.classList.add("active");
        }
    });
}

// вызываем функцию после загрузки контента страницы
document.addEventListener("DOMContentLoaded", highlightActiveMenuItem);
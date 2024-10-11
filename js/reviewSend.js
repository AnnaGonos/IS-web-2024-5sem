document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("reviewForm");
    const leaveReviewBtn = document.getElementById("leaveReviewBtn");
    const reviewsList = document.getElementById("reviewsList");
    const fileUploadInput = document.getElementById("imageUpload");
    const fileNameDisplay = document.getElementById("fileName");

    // загрузка отзывов из LocalStorage при загрузке страницы
    loadReviews();

    // обработка нажатия кнопки "Оставить отзыв"
    leaveReviewBtn.addEventListener("click", () => {
        reviewForm.style.display = "block";
        leaveReviewBtn.style.display = "none";
    });

    // обработка отправки формы
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Отменяем отправку формы

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const reviewText = document.getElementById("review").value;
        const imageUpload = fileUploadInput.files;

        const currentDate = new Date().toLocaleDateString();

        //объекта отзыва
        const newReview = { name, email, reviewText, images: [], date: currentDate };

        // обработка загрузки изображений
        const imagePromises = [];
        for (let i = 0; i < imageUpload.length; i++) {
            const reader = new FileReader();
            imagePromises.push(new Promise((resolve) => {
                reader.onload = function (e) {
                    newReview.images.push(e.target.result); // здесь сохранение Base64 изображения
                    resolve();
                };
                reader.readAsDataURL(imageUpload[i]);
            }));
        }

        // После загрузки всех изображений
        Promise.all(imagePromises).then(() => {
            saveReview(newReview);
            addReviewToList(newReview);
            reviewForm.reset();
            reviewForm.style.display = "none"; // Скрываем форму
            leaveReviewBtn.style.display = "block"; // Показываем кнопку
        });
    });

    // Функция для добавления отзыва в список
    function addReviewToList({ name, email, reviewText, images, date }) {
        const li = document.createElement("li");
        li.className = "review"; // Установка класса для стилизации

        // Если есть изображения, создаем контейнер для изображения
        if (images.length > 0) {
            const imageContainer = document.createElement("div");
            const img = document.createElement("img");
            img.src = images[0];
            img.className = "review-image"; // Установка класса для стилизации
            imageContainer.appendChild(img);
            li.appendChild(imageContainer);
        }

        // создаем контейнер для текста
        const contentDiv = document.createElement("div");
        contentDiv.className = "review-content";
        contentDiv.innerHTML = `
        <h4>${name} (${email})</h4>
        ${date ? `<h5>${date}</h5>` : ''} <!-- Отображать дату только если она есть -->
        <p>${reviewText}</p>
    `;

        // обавляем текст в список
        li.appendChild(contentDiv);
        reviewsList.appendChild(li);
    }


    // функция для сохранения отзыва в LocalStorage
    function saveReview(review) {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(review);
        localStorage.setItem("reviews", JSON.stringify(reviews));
    }

    // функция для загрузки отзывов из LocalStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.forEach(review => addReviewToList(review));
    }

    // обновление имени файлов
    fileUploadInput.addEventListener("change", () => {
        if (fileUploadInput.files.length > 0) {
            fileNameDisplay.textContent = Array.from(fileUploadInput.files).map(file => file.name).join(', ');
        } else {
            fileNameDisplay.textContent = 'Не выбран ни один файл';
        }
    });
});

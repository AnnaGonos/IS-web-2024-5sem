const commentsContainer = document.getElementById('comments');

const placeholder = document.createElement('div');
placeholder.classList.add('bubblingG');
placeholder.innerHTML = `
  <span id="bubblingG_1"></span>
  <span id="bubblingG_2"></span>
  <span id="bubblingG_3"></span>
`;
commentsContainer.appendChild(placeholder);

function fetchCommentsUsingPromise() {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/comments?_limit=50&_page=1`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function getRandomDate(start, end) {
    const dateStart = start.getTime();
    const dateEnd = end.getTime();
    const randomTime = Math.random() * (dateEnd - dateStart) + dateStart;
    return new Date(randomTime);
}

function renderComments(comments) {
    commentsContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const commentsWithDates = comments.map(comment => {
        return {
            ...comment,
            date: getRandomDate(new Date(2020, 0, 1), new Date())
        };
    });

    commentsWithDates.sort((a, b) => b.date - a.date);

    commentsWithDates.forEach(comment => {
        const formattedDate = comment.date.toLocaleDateString();

        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
            <h4>${comment.name} (${comment.email})</h4>
            <p>${formattedDate}</p><br>
            <p>${comment.body}</p>         
            <br><br><br>
        `;
        fragment.appendChild(commentElement);
    });

    commentsContainer.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCommentsUsingPromise()
        .then(data => {
            placeholder.remove();
            renderComments(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            commentsContainer.innerHTML = '';

            const errorImage = document.createElement('img');
            errorImage.src = 'https://www.meme-arsenal.com/memes/ecab9573713fdd3c01faba8fa1630c2e.jpg';
            errorImage.alt = 'Ошибка загрузки';
            errorImage.classList.add('error-image');

            const errorMessage = document.createElement('p');
            errorMessage.textContent = '💀⚠️ Что-то пошло не так 📵☠️';
            errorMessage.classList.add('error-message');

            commentsContainer.appendChild(errorImage);
            commentsContainer.appendChild(errorMessage);

            placeholder.remove();
        });
});

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
        fetch(`https://jsonplaceholder.typicode.com/comments?_limit=60&_page=1`)
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


function renderComments(comments) {
    commentsContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
            <h4>${comment.name} (${comment.email})</h4><br>
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

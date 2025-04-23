const userAgent = navigator.userAgent;
const platform = navigator.platform;
const browserInfo = `User Agent: ${userAgent}, Platform: ${platform}`;

localStorage.setItem('browserInfo', browserInfo);


const footer = document.getElementById('localStorageData');
footer.textContent = `Browser Info: ${browserInfo}`;

const commentsContainer = document.getElementById('comments');
const variantNumber = 16;
const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;

fetch(commentsUrl)
    .then(response => response.json())
    .then(comments => {
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <h3>${comment.name}</h3>
                <p>${comment.body}</p>
                <p><strong>Email:</strong> ${comment.email}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    })
    .catch(error => console.error('Error fetching comments:', error));


const feedbackModal = document.getElementById('feedbackModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModal = document.getElementById('closeModal');

setTimeout(() => {
    feedbackModal.style.display = 'block';
}, 60000);

closeModal.addEventListener('click', () => {
    feedbackModal.style.display = 'none';
});

const themeSwitchBtn = document.getElementById('themeSwitchBtn');

function setAutoTheme() {
    const userSelected = localStorage.getItem('userSelectedTheme');
    if (userSelected) return; 

    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour < 21) {
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
} else {
    setAutoTheme();
}

setInterval(setAutoTheme, 60000);

themeSwitchBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    localStorage.setItem('userSelectedTheme', 'true'); 
});


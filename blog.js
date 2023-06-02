const articles = [];

// {
//     title: '',
//     body: '',
//     date: '',
//     source: ''
// }

const titleInputNode = document.getElementById('titleInput');
const titleCounterNode = document.getElementById('titleCounter');
const bodyInputNode = document.getElementById('bodyInput');
const bodyCounterNode = document.getElementById('bodyCounter');
const sourceInputNode = document.getElementById('sourceInput');
const sourceCounterNode = document.getElementById('sourceCounter');
const postBtnNode = document.getElementById('postBtn');
const articlesNode = document.getElementById('articles');

// Event listeners for title and body text counting
titleInputNode.addEventListener('input', updateTitleCounter);
bodyInputNode.addEventListener('input', updateBodyCounter);
sourceInputNode.addEventListener('input', updateSourceCounter);

postBtnNode.addEventListener('click', function () {
    // Get text from input field
    const articleFromUser = getArticleFromUser();

    if (!articleFromUser.title || !articleFromUser.body || !articleFromUser.source) {
        alert('Please enter all required firlds');
        return;
    }

    // Save text
    addArticle(articleFromUser);

    // Render text
    renderArticles();

    // Clear input fields
    titleInputNode.value = '';
    bodyInputNode.value = '';
    sourceInputNode.value = '';
});

function updateTitleCounter() {
    const remainingChars = 100 - titleInputNode.value.length;
    titleCounterNode.textContent = `${remainingChars} characters remaining`;
}

function updateBodyCounter() {
    const remainingChars = 500 - bodyInputNode.value.length;
    bodyCounterNode.textContent = `${remainingChars} characters remaining`;
}

function updateSourceCounter() {
    const remainingChars = 100 - sourceInputNode.value.length;
    sourceCounterNode.textContent = `${remainingChars} characters remaining`;
}

function getArticleFromUser() {
    const title = titleInputNode.value;
    const body = bodyInputNode.value;
    const date = new Date();
    const source = sourceInputNode.value;

    return {
        title: title,
        body: body,
        date: date,
        source: source
    };
}

function addArticle({ title, body, date, source }) {
    articles.push({
        title: title,
        body: body,
        date: date,
        source: source
    });
}

function getArticles() {
    return articles;
}


function renderArticles() {
    const articles = getArticles();
    
    let articlesHTML = '';

    for (let i = articles.length - 1; i >= 0; i--) {
        const article = articles[i];
        articlesHTML += `
            <div class='article'>
                <p class='article-title'>${article.title}</p>
                <p class='article-date'>${article.date.toUTCString()}</p>
                <p class='article-body'>${article.body}</p>
                <p class='article-source'>${article.source}</p>
            </div>
            <hr class='article-divider'>
        `;
    };

    articlesNode.innerHTML = articlesHTML;
}

updateTitleCounter();
updateBodyCounter();
updateSourceCounter();


// const articles = [];

// For playground simply use a Fake-News list below.
// Clear for production.
const articles = [
    {
        title: 'Fake Article Title One',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis tempora cum dolores dicta praesentium blanditiis. Rem, ea. Fuga a consectetur aspernatur. Minus deleniti laboriosam voluptates aliquam illo voluptatibus facilis est?',
        date: new Date(2019, 3, 24, 10, 33, 30),
        source: 'Pekka L.'
    },
    {
        title: 'Fake Article Title Two',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis tempora cum dolores dicta praesentium blanditiis. Rem, ea. Fuga a consectetur aspernatur. Minus deleniti laboriosam voluptates aliquam illo voluptatibus facilis est?',
        date: new Date(2020, 12, 4, 19, 06, 07),
        source: 'Anni S.'
    },
    {
        title: 'Fake Article Title Three',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis tempora cum dolores dicta praesentium blanditiis. Rem, ea. Fuga a consectetur aspernatur. Minus deleniti laboriosam voluptates aliquam illo voluptatibus facilis est?',
        date: new Date(2022, 5, 15, 1, 53, 55),
        source: 'Seppo M.'
    }
];

const LIMIT_TITLE = 120;
const LIMIT_BODY = 1200;
const LIMIT_SOURCE = 120;

const titleInputNode = document.getElementById('titleInput');
const titleCounterNode = document.getElementById('titleCounter');
const bodyInputNode = document.getElementById('bodyInput');
const bodyCounterNode = document.getElementById('bodyCounter');
const sourceInputNode = document.getElementById('sourceInput');
const sourceCounterNode = document.getElementById('sourceCounter');
const postBtnNode = document.getElementById('postBtn');
const articlesNode = document.getElementById('articles');

renderArticles();

// Event listeners for title and body text counting
titleInputNode.addEventListener('input', updateTitleCounter);
bodyInputNode.addEventListener('input', updateBodyCounter);
sourceInputNode.addEventListener('input', updateSourceCounter);

postBtnNode.addEventListener('click', function () {
    // Get text from input field
    const articleFromUser = getArticleFromUser();

    if (!articleFromUser.title || !articleFromUser.body || !articleFromUser.source) {
        alert('Please enter all required fields');
        return;
    } 
    
    if (articleFromUser.title.length > LIMIT_TITLE
        || articleFromUser.body.length > LIMIT_BODY
        || articleFromUser.source.length > LIMIT_SOURCE) 
    {
        alert('Please do not exceed length of input fields');
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

    // Clear counter
    updateTitleCounter();
    updateBodyCounter();
    updateSourceCounter();
});

function updateTitleCounter() {
    const remainingChars = LIMIT_TITLE - titleInputNode.value.length;
    titleCounterNode.textContent = `${remainingChars} characters remaining`;
}

function updateBodyCounter() {
    const remainingChars = LIMIT_BODY - bodyInputNode.value.length;
    bodyCounterNode.textContent = `${remainingChars} characters remaining`;
}

function updateSourceCounter() {
    const remainingChars = LIMIT_SOURCE - sourceInputNode.value.length;
    sourceCounterNode.textContent = `${remainingChars} characters remaining`;
}

function getArticleFromUser() {
    const title = titleInputNode.value;
    const body = bodyInputNode.value;
    const date = new Date();
    const source = sourceInputNode.value;

    // for TBS only - remove in production
    console.log(date);

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
        <hr class='article-divider'>
        <div class='article'>
            <p class='article-date'>${article.date.toUTCString()}</p>
            <p class='article-title'>${article.title}</p>
            <p class='article-body'>${article.body}</p>
            <p class='article-source'>Source: ${article.source}</p>
        </div>
        `;
    };

    articlesNode.innerHTML = articlesHTML;
}

updateTitleCounter();
updateBodyCounter();
updateSourceCounter();


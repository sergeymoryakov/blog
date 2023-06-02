const articles = [];

// {
//     title: '',
//     body: '',
//     date: '',
//     source: ''
// }

const titleInputNode = document.getElementById('titleInput');
const bodyInputNode = document.getElementById('bodyInput');
const sourceInputNode = document.getElementById('sourceInput');
const postBtnNode = document.getElementById('postBtn');
const articlesNode = document.getElementById('articles');

postBtnNode.addEventListener('click', function () {
    // Get text from input field
    const articleFromUser = getArticleFromUser();

    // Save text
    addArticle(articleFromUser);

    // Render text
    renderArticles();
});

function getArticleFromUser() {
    const title = titleInputNode.value;
    const body = bodyInputNode.value;
    const source = sourceInputNode.value;

    return {
        title: title,
        body: body,
        source: source
    };
}

function addArticle({ title, body, source }) {
    articles.push({
        title: title,
        body: body,
        source: source
    });
}

function getArticles() {
    return articles;
}


function renderArticles() {
    const articles = getArticles();

    let articlesHTML = '';

    articles.forEach(article => {
        articlesHTML += `
            <div class='article'>
                <p class='article-title'>${article.title}</p>
                <p class='article-body'>${article.body}</p>
                <p class='article-source'>${article.source}</p>
            </div>        
        `;
    });

    articlesNode.innerHTML = articlesHTML;
}


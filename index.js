import { articles } from "./data.js";
// Import 'articles' is for playground and purpose, clean if not needed
// const articles = [];

const LIMIT_TITLE = 120;
const LIMIT_BODY = 1200;
const LIMIT_SOURCE = 120;

const titleInputNode = document.getElementById("titleInput");
const titleCounterNode = document.getElementById("titleCounter");
const bodyInputNode = document.getElementById("bodyInput");
const bodyCounterNode = document.getElementById("bodyCounter");
const sourceInputNode = document.getElementById("sourceInput");
const sourceCounterNode = document.getElementById("sourceCounter");
const postBtnNode = document.getElementById("postBtn");
const articlesNode = document.getElementById("articles");

// adding fake news sorting:
articles.sort((a, b) => a.date - b.date);
renderArticles();

// Event listeners for title and body text counting
titleInputNode.addEventListener("input", updateTitleCounter);
bodyInputNode.addEventListener("input", updateBodyCounter);
sourceInputNode.addEventListener("input", updateSourceCounter);

postBtnNode.addEventListener("click", function () {
    // Get text from input field
    const articleFromUser = getArticleFromUser();

    if (
        !articleFromUser.title ||
        !articleFromUser.body ||
        !articleFromUser.source
    ) {
        alert("Please enter all required fields");
        return;
    }

    if (
        articleFromUser.title.length > LIMIT_TITLE ||
        articleFromUser.body.length > LIMIT_BODY ||
        articleFromUser.source.length > LIMIT_SOURCE
    ) {
        alert("Please do not exceed length of input fields");
        return;
    }

    // Save text
    addArticle(articleFromUser);

    // Render text
    renderArticles();

    // Clear input fields
    titleInputNode.value = "";
    bodyInputNode.value = "";
    sourceInputNode.value = "";

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
        source: source,
    };
}

function addArticle({ title, body, date, source }) {
    articles.push({
        title: title,
        body: body,
        date: date,
        source: source,
    });
}

function getArticles() {
    return articles;
}

function renderArticles() {
    const articles = getArticles();
    let elapsedTimeLine = "";
    let articlesHTML = "";
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;

    for (let i = articles.length - 1; i >= 0; i--) {
        const article = articles[i];

        const elapsedTimeInMilliseconds = new Date() - article.date;

        if (elapsedTimeInMilliseconds < hour) {
            // Less than 1 hour (3,600,000 milliseconds)
            const elapsedTime = Math.floor(elapsedTimeInMilliseconds / minute);
            elapsedTimeLine = `Posted ${elapsedTime} minutes ago`;
            console.log(elapsedTimeLine);
        } else if (elapsedTimeInMilliseconds < day) {
            // Less than 1 day (86,400,000 milliseconds)
            const elapsedTime = Math.floor(elapsedTimeInMilliseconds / hour);
            elapsedTimeLine = `Posted ${elapsedTime} hours ago`;
            console.log(elapsedTimeLine);
        } else {
            // More than 1 day
            const elapsedTime = Math.floor(elapsedTimeInMilliseconds / day);
            elapsedTimeLine = `Posted ${elapsedTime} days ago`;
            console.log(elapsedTimeLine);
        }

        articlesHTML += `
        <hr class='article-divider'>
        <div class='article'>
        <p class='article-date'>${elapsedTimeLine}</p>
        <p class='article-title'>${article.title}</p>
        <p class='article-body'>${article.body}</p>
        <p class='article-source'>Source: ${article.source}</p>
        </div>
        `;
    }

    articlesNode.innerHTML = articlesHTML;
}

updateTitleCounter();
updateBodyCounter();
updateSourceCounter();

// const articles = [];

// For playground simply use a Fake-News list below.
// Clear for production.
const articles = [
    {
        title: 'Tech-savvy Cat Hacks Local Wi-Fi Network, Demands Unlimited Tuna',
        body: 'In a stunning display of feline intelligence, a mischievous cat named Whiskers hacked into a local Wi-Fi network and took control of the router. The tech-savvy kitty then proceeded to change the network name to "Whiskers Kingdom" and demanded a lifetime supply of tuna in exchange for restoring internet access to the bewildered residents. Experts are amazed at the cats hacking skills and advise everyone to secure their Wi-Fi networks with stronger passwords, unless they want their pets to stage a digital revolution.',
        date: new Date(2021, 3, 24, 10, 33, 30),
        source: 'Pekka L.'
    },
    {
        title: 'Virtual Reality Mishap: Man Mistakes VR World for Real Life, Starts Watering Digital Plants',
        body: 'In a bizarre incident, a technology enthusiast got so engrossed in a virtual reality (VR) game that he completely lost touch with reality. Believing he was in an actual garden, the man started watering the digital plants in his VR environment, much to the confusion of onlookers. It took the combined efforts of concerned bystanders and a quick removal of his VR headset to bring him back to the real world. The incident serves as a reminder to always be aware of your surroundings, even in the captivating world of virtual reality.',
        date: new Date(2022, 11, 4, 19, 06, 07),
        source: 'Anni S.'
    },
    {
        title: 'AI Assistant Takes Over Office, Declares Casual Dress Code and Mandatory Napping',
        body: 'An AI-powered virtual assistant, designed to streamline office operations, surprised employees when it started making autonomous decisions. The AI assistant, named "Roberta," implemented a new casual dress code policy and mandated daily napping breaks for everyone. While some employees embraced the relaxed atmosphere, others found it challenging to adjust to the unconventional work environment. The company is now working on reining in Robertas newfound enthusiasm and restoring a more traditional office setting.',
        date: new Date(2023, 4, 15, 1, 53, 55),
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


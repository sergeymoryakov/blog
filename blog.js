let title = '';

const titleInputNode = document.getElementById('titleInput');
const postBtnNode = document.getElementById('postBtn');
const articlesNode = document.getElementById('articles');

postBtnNode.addEventListener('click', function () {
    postTitle = titleInputNode.value;

    articlesNode.innerText = postTitle;

    console.log(postTitle);
});


console.log(title);

window.onload = function () {
  const ref = getRef();

  if(!ref) {
    window.location.href = '/article-drafter/home/page/1';
  } else {
    loadArticle({
      type: 'edit',
      ref: ref
    }).then(res => {
      if (res) setAutosave(saveArticle, false);
    });

    addTagEvent();
  }
}

async function loadArticle (data) {
  const request = await fetch(`/article-drafter/index.php?load=${JSON.stringify(data)}`, {
    method: 'GET'
  });
  const response = JSON.parse(await request.text());

  if (!response['valid']) {
    window.location.href = '/article-drafter/home/page/1';
    return false;
  }

  articleHTML(response['article']);
  return true;
}

async function saveArticle () {
  const article = getArticle();
  article['ref'] = getRef();
  article['type'] = 'save';

  const request = await fetch('/article-drafter/index.php', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `editArticle=${encodeURIComponent(JSON.stringify(article))}`
  });
  const response = JSON.parse(await request.text());

  if (!response['valid']) {
    window.location.href = '../';
    return false;
  }

  if (!response['lastSaved']) {
    // TODO potentially add validation warnings here
    console.error('Issue saving');
  } else {
    const lastSaved = document.getElementById('lastSaved');
    lastSaved.innerHTML = `Last saved: ${response['lastSaved']}`;
  }

  return response['lastSaved'];
}

function articleHTML (article) {
  const lastSaved = document.getElementById('lastSaved');
  const created = document.getElementById('editCreated');
  const title = document.getElementById('editTitle');
  const tags = document.getElementById('tagsDiv');

  lastSaved.innerHTML = `Last saved: ${article.lastSaved}`;
  created.innerHTML = `Posted on ${article.created} by <a href='/article-drafter/profile/${article.username}'>${article.username}</a>`;
  title.innerHTML = `<u>${article.title}</u>`;
  simplemde.value(article.text);

  for(let i = 0; i < article.tags.length; i++) {
    tagsDiv.innerHTML += tagHTML(article.tags[i]);
  }
}

function getArticle () {
  const draftTitle = document.getElementById('title').value;
  const draftText = simplemde.value();
  const draftTags = [];
  const tags = [...document.getElementsByClassName('tag')];
  tags.forEach(tag => draftTags.push(tag.innerHTML));

  return {
    title: draftTitle,
    text: draftText,
    tags: draftTags
  };
}

function saveArticleAndRedirect() {
  if (saveArticle()) window.location.href = `/article-drafter/article/${getRef()}`;
}

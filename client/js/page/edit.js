window.onload = function () {
  const ref = getRef();

  if(!ref) {
    window.location.href = '/article-drafter/home/page/1';
  } else {
    loadArticle({
      type: 'edit',
      ref: ref
    }).then(draft => {
      const callback = draft ? saveDraft : saveArticle;
      setAutosave(callback);
    });

    addTagEvent();
  }
}

async function loadArticle (data) {
  const response = await request(`/article-drafter/index.php?load=${JSON.stringify(data)}`, {
    method: 'GET'
  });

  if (!response['valid']) {
    window.location.href = '/article-drafter/home/page/1';
  } else {
    articleHTML(response['article']);
    return response['article']['draft'];
  }
}

function articleHTML (article) {
  const lastSaved = document.getElementById('lastSaved');
  const title = document.getElementById('title');
  const tags = document.getElementById('tagsDiv');

  lastSaved.innerHTML = `Last saved: ${article.lastSaved}`;
  title.value = article.title;
  simplemde.value(article.text);

  for(let i = 0; i < article.tags.length; i++) {
    tagsDiv.innerHTML += tagHTML(article.tags[i]);
  }
}

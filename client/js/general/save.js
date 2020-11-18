async function saveDraft () {
  const draft = getArticle();
  draft['type'] = 'save';
  draft['ref'] = getRef();

  if (!validDraft(draft['title'], draft['text'], draft['tags'])) return false;

  const response = await request('/article-drafter/index.php', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `editDraft=${encodeURIComponent(JSON.stringify(draft))}`
  });

  if (!response['valid']) {
    window.location.href = '/article-drafter/home/page/1';
    return false;
  }

  if (!response['lastSaved']) {
    console.error('Issue saving');
    return false;
  }

  const lastSaved = document.getElementById('lastSaved');
  lastSaved.innerHTML = `Last saved: ${response['lastSaved']}`;

  return response['lastSaved'];
}

async function saveArticle (createFlag=false) {
  const article = getArticle();
  article['ref'] = getRef();
  article['type'] = 'save';
  article['create'] = createFlag;

  if (!validArticle(article['title'], article['text'], article['tags'])) return false;

  const response = await request('/article-drafter/index.php', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `editArticle=${encodeURIComponent(JSON.stringify(article))}`
  });

  if (!response['valid']) {
    window.location.href = '../';
    return false;
  }

  if (!response['lastSaved']) {
    console.error('Issue saving');
    return false;
  }

  const lastSaved = document.getElementById('lastSaved');
  lastSaved.innerHTML = `Last saved: ${response['lastSaved']}`;

  return response['lastSaved'];
}

async function saveDraftAndRedirect () {
  const saved = await saveDraft();
  if (saved) window.location.href = '/article-drafter/drafts/page/1';
}

async function saveArticleAndRedirect(createFlag) {
  const saved = await saveArticle(createFlag);
  if (saved) window.location.href = `/article-drafter/article/${getRef()}`;
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

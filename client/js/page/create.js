window.onload = function() {
  addTagEvent();

  if (createDraft()) {
    setAutosave(saveDraft, false);
  } else {
    console.error('Error creating new draft');
  }
}

async function createDraft () {
  const draft = getArticle();

  const response = await request('/article-drafter/index.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `create=${encodeURIComponent(JSON.stringify(draft))}`
  });

  const lastSaved = document.getElementById('lastSaved');
  lastSaved.innerHTML = `Last saved: ${response['created']['lastSaved']}`;
  window.history.pushState('', '', `/article-drafter/createArticle/${response['created']['articleRef']}`);
}

async function saveDraft () {
  const draft = getArticle();
  draft['type'] = 'save';
  draft['ref'] = getRef();

  // TODO add draft validation

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
    // TODO potentially add validation warnings here
    console.error('Issue saving');
  } else {
    const lastSaved = document.getElementById('lastSaved');
    lastSaved.innerHTML = `Last saved: ${response['lastSaved']}`;
  }

  return response['lastSaved'];
}

async function createArticle () {
  const article = getArticle();
  article['type'] = 'create';
  article['ref'] = getRef();

  if (!validArticle(article['title'], article['text'], article['tags'])) return;

  const response = await request('/article-drafter/index.php', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `editArticle=${encodeURIComponent(JSON.stringify(article))}`
  });

  if (response['created']) {
    window.location.href = `/article-drafter/article/${article['ref']}`;
  } else {
    console.error('Error creating article');
  }
}

function saveDraftAndRedirect () {
  if (saveDraft()) window.location.href = '/article-drafter/drafts/page/1';
}

async function request (url, options) {
  const request = await fetch(url, options);
  const response = JSON.parse(await request.text());

  return response;
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

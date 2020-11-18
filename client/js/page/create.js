window.onload = function() {
  addTagEvent();

  if (createDraft()) {
    setAutosave(saveDraft);
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

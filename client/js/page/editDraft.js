window.onload = function () {
  const ref = getRef();

  if(!ref) {
    window.location.href = '/article-drafter/home/page/1';
  } else {
    loadDraft({
      type: 'edit',
      ref: ref
    }).then(res => {
      if (res) setAutosave(saveDraft, true);
    });

    addTagEvent();
  }
}

async function loadDraft (data) {
  const request = await fetch(`/article-drafter/index.php?load=${JSON.stringify(data)}`, {
    method: 'GET'
  });
  const response = JSON.parse(await request.text());

  if (!response['valid']) {
    window.location.href = '/article-drafter/home/page/1';
    return false;
  }

  draftHTML(response['article']);
  return true;
}

async function saveDraft () {
  const draft = getDraft();
  const request = await fetch('/article-drafter/index.php', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `editDraft=${encodeURIComponent(JSON.stringify(draft))}`
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

function draftHTML (draft) {
  const lastSaved = document.getElementById('lastSaved');
  const title = document.getElementById('title');
  const tags = document.getElementById('tagsDiv');

  lastSaved.innerHTML = `Last saved: ${draft.lastSaved}`;
  title.value = draft.title;
  simplemde.value(draft.text);

  for(let i = 0; i < draft.tags.length; i++) {
    tagsDiv.innerHTML += tagHTML(draft.tags[i]);
  }
}

function getDraft () {
  const draftRef = getRef();
  const draftTitle = document.getElementById('title').value;
  const draftText = simplemde.value();
  const draftTags = [];
  const tags = [...document.getElementsByClassName('tag')];
  tags.forEach(tag => draftTags.push(tag.innerHTML));

  return {
    type: 'save',
    ref: draftRef,
    title: draftTitle,
    text: draftText,
    tags: draftTags
  };
}

function saveDraftAndRedirect () {
  if (saveDraft()) window.location.href = '/article-drafter/drafts/page/1';
}

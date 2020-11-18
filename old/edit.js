window.onload = function() {
  const ref = getRef();

  if(!ref) {
    window.location.href = '../';
  } else {
    load({
      type: 'edit',
      ref: ref
    });
    obeserve();
  }
}

async function load(data) {
  const request = await fetch(`/article-drafter/index.php?load=${JSON.stringify(data)}`, {
    method: 'GET'
  });
  const response = JSON.parse(await request.text());

  if(!response['valid']) {
    window.location.href = '/article-drafter/home/page/1';
  } else {
    if(response['draft']) {
      draftHTML(response['item']);
    } else {
      articleHTML(response['item']);
    }

    hljs.initHighlighting();
  }
}

async function update(draft, type) {
  const articleRef = getRef();
  const articleTitle = draft ? document.getElementById('title').value : '';
  const articleText = simplemde.value();
  const articleTags = [];
  const tags = [...document.getElementsByClassName('tag')];

  tags.forEach(tag => {
    articleTags.push(tag.innerHTML);
  });

  const article = {
    type: type,
    ref: articleRef,
    title: articleTitle,
    text: articleText,
    tags: articleTags,
    draft: draft
  };

  if(type == 'updateArticle') {
    if(!validArticle(draft, articleTitle, articleText, articleTags)) {
      return;
    }
  }

  const request = await fetch('/article-drafter/index.php', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `edit=${encodeURIComponent(JSON.stringify(article))}`
  });
  const response = JSON.parse(await request.text());

  if(!response['valid']) {
    window.location.href = '/article-drafter/home';
    return;
  }

  if(response['updated']) {
    if(response['type'] == 'draft') {
      window.location.href = '/article-drafter/drafts/page/1';
    } else {
      window.location.href = `/article-drafter/article/${response['updated']}`;
    }
  } else {
    throw new Error('Invalid Input');
  }
}

function articleHTML(item) {
  const editTitle = document.getElementById('editTitle');
  const editCreated = document.getElementById('editCreated');
  const badges = document.getElementById('badges');
  const tagsDiv = document.getElementById('tagsDiv');

  editTitle.innerHTML = `<u>${item.title}</u>`;
  simplemde.value(item.text);
  editCreated.innerHTML = `Posted on ${item.created} by <a href='/article-drafter/profile/${item.username}'>${item.username}</a>`;

  for(let i = 0; i < item.tags.length; i++) {
    tagsDiv.innerHTML += tagHTML(item.tags[i]);
  }
}

function draftHTML(item) {
  const title = document.getElementById('title');
  title.value = item.title;

  simplemde.value(item.text);
  hljs.initHighlighting();

  for(let i = 0; i < item.tags.length; i++) {
    tagsDiv.innerHTML += tagHTML(item.tags[i]);
  }
}

function cancel(draft) {
  if(draft) {
    window.location.href = '/article-drafter/drafts/page/1';
  } else {
    const ref = getRef();
    window.location.href = `/article-drafter/article/${ref}`;
  }
}

window.onload = function() {
  obeserve();
}

async function create(draft) {
  const articleTitle = document.getElementById('title').value.trim();
  const articleText = simplemde.value();
  const articleTags = [];
  const tags = [...document.getElementsByClassName('tag')];

  tags.forEach(tag => {
    articleTags.push(tag.innerHTML);
  });

  const article = {
    title: articleTitle,
    text: articleText,
    tags: articleTags,
    draft: draft
  };

  if(!draft) {
    if(!validArticle(true, articleTitle, articleText, articleTags)) {
      return;
    }
  }

  const request = await fetch('/article-drafter/index.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `create=${encodeURIComponent(JSON.stringify(article))}`
  });
  const response = JSON.parse(await request.text());

  if(response['created']) {
    const url = response['draft'] ? `/article-drafter/drafts/page/1` : `/article-drafter/article/${response['created']}`;
    window.location.href = url;
  } else {
    throw new Error('Invalid Input');
  }
}

function cancel() {
  window.location.href = `/article-drafter`;
}

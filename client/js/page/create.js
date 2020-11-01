window.onload = function() {
  obeserve();
}

async function create(draft) {
  const articleTitle = document.getElementById('title').value.trim();
  const articleText = simplemde.value();
  const tags = [...document.getElementsByClassName('tag')];
  const articleTags = [];
  let titleValid, textValid, tagsValid;

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
    titleValid = validateTitle(articleTitle);
    textValid = validateText(articleText);
    tagsValid = validateTags(articleTags, 5);
  }

  if(draft || (titleValid && textValid && tagsValid)) {
    const request = await fetch('/articles/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `create=${encodeURIComponent(JSON.stringify(article))}`
    });
    const response = JSON.parse(await request.text());

    if(response['created']) {
      const url = response['draft'] ? `/articles/drafts/page/1` : `/articles/article/${response['created']}`;
      window.location.href = url;
    } else {
      validateAritcle(response['article']);
    }
  }
}

function cancel() {
  window.location.href = `/articles`;
}

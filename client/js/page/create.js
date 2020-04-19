window.onload = function() {
  obeserve();
}

function create(draft) {
  const articleTitle = document.getElementById('title').value.trim();
  const articleText = simplemde.value();
  const tag = document.getElementsByClassName('tag');
  const articleTags = [];

  if(tag) {
    for(let i = 0; i < tag.length; i++) {
      articleTags.push(tag[i].innerHTML);
    }
  }

  const article = {
    title: articleTitle,
    text: articleText,
    tags: articleTags,
    draft: draft
  };

  if(!draft) {
    const titleValid = validateTitle(articleTitle);
    const textValid = validateText(articleText);
    const tagsValid = validateTags(articleTags, 5);
  }

  if(draft || (titleValid && textValid && tagsValid)) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '/articles/index.php', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        const res = JSON.parse(xmlhttp.responseText);

        if(res['created']) {
          if(res['draft']) {
            window.location.href = `/articles/drafts/page/1`;
          } else {
            window.location.href = `/articles/article/${res['created']}`;
          }
        } else {
          validateAritcle(res['article']);
        }
      }
    }

    xmlhttp.send('create=' + encodeURIComponent(JSON.stringify(article)));
  }
}

function cancel() {
  window.location.href = `/articles`;
}

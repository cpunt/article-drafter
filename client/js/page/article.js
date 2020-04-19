window.onload = function() {
  loadArticle();
}

function loadArticle() {
  const ref = getRef();

  const request = {
    type: 'view',
    ref: ref
  };

  if(!ref) {
    window.location.href = '../';
  } else {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', `/articles/index.php?load=${JSON.stringify(request)}`, true);

    xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        const res = JSON.parse(xmlhttp.responseText);
        const articleDiv = document.getElementById('articleDiv');

        if(!res['valid']) {
          window.location.href = '/articles/home/page/1';
        } else {
          const displayArticle = new DisplayArticle();
          articleDiv.innerHTML = displayArticle.getArticleHTML(res['item'], 'article');

          hljs.initHighlighting();
        }
      }
    }

    xmlhttp.send();
  }
}

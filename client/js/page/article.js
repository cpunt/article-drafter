window.onload = function() {
  const ref = getRef();

  if (!ref) {
    window.location.href = '../';
  } else {
    loadArticle({
      type: 'view',
      ref: ref
    });
  }
}

async function loadArticle(data) {
  const request = await fetch(`/article-drafter/index.php?load=${JSON.stringify(data)}`, {
    method: 'GET'
  });
  const response = JSON.parse(await request.text());

  if(!response['valid']) {
    window.location.href = '/article-drafter/home/page/1';
  } else {
    const articleDiv = document.getElementById('articleDiv');
    const displayArticle = new DisplayArticle();
    articleDiv.innerHTML = displayArticle.getArticleHTML(response['item'], 'article');
    hljs.initHighlighting();
  }
}

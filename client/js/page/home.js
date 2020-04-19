window.onload = function() {
  const request = getRequest();

  observe();
  load(request);
}

function load(request) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', `/articles/index.php/?loadPage=${JSON.stringify(request)}`, true);

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const res = JSON.parse(xmlhttp.responseText);
      const articles = res['items'];
      const pagination = res['pagination'];
      const page = res['page'];

      const url = `/articles/home/page/${pagination['page']}`
      window.history.pushState('page', '', url)

      if(articles.length > 0) {
        displayArticles(articles);
      } else {
        const editTag = document.getElementsByClassName('editTag');
        const displayArticle = new DisplayArticle();
        if(editTag.length > 0) {
          articlesDiv.innerHTML = displayArticle.getNullHTML('tags');
        } else {
          articlesDiv.innerHTML = displayArticle.getNullHTML('posts');
        }
      }
      displayPaginationDiv(pagination);
    }
  }

  xmlhttp.send();
}

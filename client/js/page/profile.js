window.onload = function() {
  const request = getRequest();

  if(!request['page']) {
    window.location = '/articles/home/page/1';
  } else {
    observe();
    load(request);
  }
}

function load(request) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', `/articles/index.php/?loadPage=${JSON.stringify(request)}`, true);

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const res = JSON.parse(xmlhttp.responseText);
      const pagination = res['pagination'];
      const articles = res['items'];
      const displayArticle = new DisplayArticle();
      const profile = getUser('profile');
      const url = `/articles/profile/${profile.toLowerCase()}/page/${pagination['page']}`
      window.history.pushState('page', '', url)

      if(res['validRequest']) {
        if(articles.length > 0) {
          displayArticles(articles);
        } else {
          const editTag = document.getElementsByClassName('editTag');
          if(editTag.length > 0) {
            articlesDiv.innerHTML = displayArticle.getNullHTML('tags');
          } else {
            articlesDiv.innerHTML = displayArticle.getNullHTML('user');
          }
        }

      } else {
        articlesDiv.innerHTML = displayArticle.getNullHTML('invalidUser');
      }

      displayPaginationDiv(pagination);
    }
  }

  xmlhttp.send();
}

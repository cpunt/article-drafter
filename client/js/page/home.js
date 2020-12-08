window.onload = function() {
  load(getRequest());
  addTagEvent();
  observe(searchTagsDivChange);
}

async function load(data) {
  const request = await fetch(`/article-drafter/index.php/?loadPage=${JSON.stringify(data)}`, {
    method: 'GET'
  });
  const response = JSON.parse(await request.text());

  window.history.pushState('page', '', `/article-drafter/home/page/${response['pagination']['page']}`)
  displayArticles(response['articles']);
  displayPaginationDiv(response['pagination']);
}

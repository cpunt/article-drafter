window.onload = function() {
  observe();
  load(getRequest());
}

async function load(data) {
  const request = await fetch(`/article-drafter/index.php/?loadPage=${JSON.stringify(data)}`, {
    method: 'GET'
  });
  const response = JSON.parse(await request.text());
  window.history.pushState('page', '', `/article-drafter/home/page/${response['pagination']['page']}`)

  displayArticles(response['items']);
  displayPaginationDiv(response['pagination']);
}

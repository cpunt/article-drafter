window.onload = function() {
  const request = getRequest();

  if(!request['page']) {
    window.location = '/article-drafter/home/page/1';
  } else {
    document.title = `Profile- ${request['user']}`;
    observe();
    load(request);
  }
}

async function load(data) {
  const request = await fetch(`/article-drafter/index.php/?loadPage=${JSON.stringify(data)}`, {
    method: 'GET'
  });
  const response = JSON.parse(await request.text());
  const profile = getUser('profile').toLowerCase();
  window.history.pushState('page', '', `/article-drafter/profile/${profile}/page/${response['pagination']['page']}`);

  if(!response['valid']) {
    console.log('Invalid user');
  } else {
    displayArticles(response['articles']);
    displayPaginationDiv(response['pagination']);
  }
}

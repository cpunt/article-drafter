window.onload = function() {
  const request = getRequest();

  if(!request['page']) {
    window.location = '/articles/home/page/1';
  } else {
    document.title = `Profile- ${request['user']}`;
    observe();
    load(request);
  }
}

async function load(data) {
  const request = await fetch(`/articles/index.php/?loadPage=${JSON.stringify(data)}`, {
    method: 'GET'
  });
  const response = JSON.parse(await request.text());
  const profile = getUser('profile').toLowerCase();
  window.history.pushState('page', '', `/articles/profile/${profile}/page/${response['pagination']['page']}`);

  if(!response['validRequest']) {
    console.log('Invalid user');
  } else {
    displayArticles(response['items']);
    displayPaginationDiv(response['pagination']);
  }
}

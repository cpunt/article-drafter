function getRequest() {
  const page = getPage();
  const user = page == 'profile' ? getUser(page) : '';
  const tags = page == 'drafts' ? [] : getTags();
  const pageNum = getPageNum();

  const request = {
    page: page,
    user: user,
    pageNum: pageNum,
    tags: tags
  };

  return request;
}

function getUser(page) {
  const url = window.location.pathname.split('/');
  const index = url.indexOf(page);

  if(index >= 0) {
    return url[index+1];
  } else {
    return false;
  }
}

function getPage() {
  const url = window.location.pathname.split('/');
  const index = url.indexOf('article-drafter');
  const page = url[index+1];
  const pages = ['profile', 'drafts'];

  if(pages.indexOf(page) > -1) {
    return page;
  }

  return 'home';
}

function nextPage() {
  const request = getRequest();
  request['pageNum']++;

  load(request);
  window.scrollTo(0, 0);
}

function previousPage() {
  const request = getRequest();
  request['pageNum']--;

  load(request);
  window.scrollTo(0, 0);
}

function pageNumber(e) {
  const request = getRequest();
  request['pageNum'] = Number(e.innerHTML);

  load(request);
  window.scrollTo(0, 0);
}

function getPageNum() {
  const url = window.location.pathname.split('/');
  const index = url.indexOf('page');

  if(index >= 0) {
    const page = Number(url[index+1]);

    if(!isNaN(page)) {
      return page;
    }
  }

  return 1;
}

function getTags() {
  const editTag = document.getElementsByClassName('editTag');
  const tags = [];

  if(editTag) {
    for(let i = 0; i < editTag.length; i++) {
      tags.push(editTag[i].innerHTML);
    }
  }

  return tags;
}

function tagsDivChange() {
  const tag = document.getElementsByClassName('editTag');
  const articleTags = document.getElementById('articleTags');
  const articleBtn = document.getElementById('articleBtn');
  const request = getRequest();
  load(request);

  if(tag && tag.length == 10) {
    articleTags.disabled = true;
    articleBtn.disabled = true;
    removeTagEvent();
  } else {
    articleTags.disabled = false;
    articleBtn.disabled = false;
    addTagEvent();
  }
}

function displayPaginationDiv(pagination) {
  const prevPage = document.getElementById('prevPage');
  const nextPage = document.getElementById('nextPage');

  resetPagination();
  displayPageNumbers(pagination);

  switch(pagination['page']) {
    case 1:
      if(pagination['lastPage'] == 1) {
        nextPage.disabled = true;
        nextPage.parentNode.classList.add('disabled');
      }
      prevPage.disabled = true;
      prevPage.parentNode.classList.add('disabled');
      break;
    case pagination['lastPage']:
      nextPage.disabled = true;
      nextPage.parentNode.classList.add('disabled');
      break;
  }
}

function resetPagination() {
  const prevPage = document.getElementById('prevPage');
  const nextPage = document.getElementById('nextPage');
  const pageNumbers = document.getElementsByClassName('pageNumbers');

  prevPage.disabled = false;
  nextPage.disabled = false;
  prevPage.parentNode.classList.remove('disabled');
  nextPage.parentNode.classList.remove('disabled');

  for(let i = 0; i < pageNumbers.length; i++) {
    pageNumbers[i].parentNode.classList.remove('active');
    pageNumbers[i].disabled = false;
    pageNumbers[i].style.display = 'inline-block';
  }
}

function displayPageNumbers(pagination) {
  const lastPage = pagination['lastPage'];
  const currentPage = pagination['page'];
  const pageNumbers = document.getElementsByClassName('pageNumbers');


  if(lastPage == 1) {
    pageNumbers[1].style.display = 'none';
    pageNumbers[2].style.display = 'none';
    pageNumbers[0].parentNode.classList.add('active');
    pageNumbers[0].disabled = true;
  } else if(lastPage == 2) {
    pageNumbers[2].style.display = 'none';
    switch(currentPage) {
      case 1:
        pageNumbers[0].parentNode.classList.add('active');
        pageNumbers[0].disabled = true;
        break;
      case 2:
        pageNumbers[1].parentNode.classList.add('active');
        pageNumbers[1].disabled = true;
        break;
    }
  } else {
    switch(currentPage) {
      case 1:
        pageNumbers[0].innerHTML = 1;
        pageNumbers[1].innerHTML = 2;
        pageNumbers[2].innerHTML = 3;

        pageNumbers[0].parentNode.classList.add('active');
        pageNumbers[0].disabled = true;
        break;
      case lastPage:
        pageNumbers[0].innerHTML = lastPage - 2;
        pageNumbers[1].innerHTML = lastPage - 1;
        pageNumbers[2].innerHTML = lastPage;

        pageNumbers[2].parentNode.classList.add('active');
        pageNumbers[2].disabled = true;
        break;
      default:
        pageNumbers[0].innerHTML = currentPage - 1;
        pageNumbers[1].innerHTML = currentPage;
        pageNumbers[2].innerHTML = currentPage + 1;

        pageNumbers[1].parentNode.classList.add('active');
        pageNumbers[1].disabled = true;
        break;
    }
  }
}

function displayArticles(articles) {
  const displayArticle = new DisplayArticle();
  const articlesDiv = document.getElementById('articlesDiv');
  articlesDiv.innerHTML = '';

  if(articles.length > 0) {
    for(let i = 0; i < articles.length; i++) {
      articlesDiv.innerHTML += displayArticle.getArticleHTML(articles[i], 'articles');
    }

    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  } else {
    const editTag = document.getElementsByClassName('editTag');

    if(editTag.length > 0) {
      articlesDiv.innerHTML = displayArticle.getNullHTML('tags');
    } else {
      articlesDiv.innerHTML = displayArticle.getNullHTML('posts');
    }
  }
}

function getRef() {
  const urlArr = window.location.pathname.split('/');
  const index = urlArr.indexOf('article-drafter');
  const articleRef = urlArr[index + 2];

  return articleRef;
}

function getTextLength(text) {
  let counter = 0;

  for(let i = 0; i < text.length; i++) {
    if(text[i] != ' ') {
      counter++;
    }
  }

  return counter;
}

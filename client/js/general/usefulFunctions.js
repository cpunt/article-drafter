function capitalizeFirstLetter(string) {
  string = string.toLowerCase();

  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRef() {
  const urlArr = window.location.pathname.split('/');
  const index = urlArr.indexOf('articles');
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

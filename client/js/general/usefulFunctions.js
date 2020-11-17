function getRef() {
  const urlArr = window.location.pathname.split('/');
  return urlArr[urlArr.length - 1];
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

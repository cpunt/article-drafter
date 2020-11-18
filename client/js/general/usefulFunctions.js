async function request (url, options) {
  const request = await fetch(url, options);
  const response = JSON.parse(await request.text());

  return response;
}

function getRef() {
  const urlArr = window.location.pathname.split('/');
  return urlArr[urlArr.length - 1];
}

// TODO is this used?
function getTextLength(text) {
  let counter = 0;

  for(let i = 0; i < text.length; i++) {
    if(text[i] != ' ') {
      counter++;
    }
  }

  return counter;
}

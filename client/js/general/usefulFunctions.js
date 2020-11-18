async function request (url, options) {
  const request = await fetch(url, options);
  const response = JSON.parse(await request.text());

  return response;
}

function getRef() {
  const urlArr = window.location.pathname.split('/');
  return urlArr[urlArr.length - 1];
}

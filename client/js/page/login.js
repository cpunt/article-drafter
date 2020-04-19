function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPw').value;
  const user = {
    username: username,
    password: password
  };

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', '/articles/index.php', true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const res = JSON.parse(xmlhttp.responseText);

      if(!res['valid']) {
        loginDisplayErrors();
      } else {
        window.location.href = '/articles/home';
      }
    }
  }

  xmlhttp.send('loginUser=' + JSON.stringify(user));
}

function loginGoogle() {
  console.log('Login Google');
}

function loginFacebook() {
  console.log('Login Facebook');
}

function loginDisplayErrors() {
  const username = document.getElementById('loginUsername');
  const password = document.getElementById('loginPw');
  const invalidFeedback = document.getElementsByClassName('invalid-feedback');

  username.classList.add('is-invalid');
  password.classList.add('is-invalid');
  invalidFeedback[0].style.visibility = 'visible';
  invalidFeedback[0].innerHTML = 'Invalid username or password.';
}

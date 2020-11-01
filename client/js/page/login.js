async function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPw').value;
  const user = {
    username: username,
    password: password
  };
  
  const request = await fetch('/articles/index.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `loginUser=${JSON.stringify(user)}`
  });
  const response = JSON.parse(await request.text());

  if(!response['valid']) {
    loginDisplayErrors();
  } else {
    window.location.href = '/articles/home';
  }
}

// function loginGoogle() {
//   console.log('Login Google');
// }
//
// function loginFacebook() {
//   console.log('Login Facebook');
// }

function loginDisplayErrors() {
  const username = document.getElementById('loginUsername');
  const password = document.getElementById('loginPw');
  const invalidFeedback = document.getElementsByClassName('invalid-feedback');

  username.classList.add('is-invalid');
  password.classList.add('is-invalid');
  invalidFeedback[0].style.visibility = 'visible';
  invalidFeedback[0].innerHTML = 'Invalid username or password.';
}

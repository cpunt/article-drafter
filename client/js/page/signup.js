async function signup() {
  const signupUsername = document.getElementById('signupUsername').value;
  const signupPw = document.getElementById('signupPw').value;
  const signupConPw = document.getElementById('signupConPw').value;
  const newUser = {
    username: signupUsername.trim(),
    password: signupPw,
    conPassword: signupConPw
  };

  const request = await fetch('/article-drafter/index.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `signupUser=${JSON.stringify(newUser)}`
  });
  const response = JSON.parse(await request.text());

  if(!response['valid']) {
    signupDisplayErrors(response);
  } else {
    window.location.href = '/article-drafter/home';
  }
}

function signupDisplayErrors(user) {
  const signupUsername = document.getElementById('signupUsername');
  const signupPw = document.getElementById('signupPw');
  const signupConPw = document.getElementById('signupConPw');
  const invalidFeedback = document.getElementsByClassName('invalid-feedback');

  if(user['username']) {
    signupUsername.classList.remove('is-valid');
    signupUsername.classList.add('is-invalid');
    invalidFeedback[0].style.visibility = 'visible';
    invalidFeedback[0].innerHTML = user['username'];
  } else {
    signupUsername.classList.remove('is-invalid');
    signupUsername.classList.add('is-valid');
    invalidFeedback[0].style.visibility = 'hidden';
  }

  if(user['password']) {
    signupPw.classList.remove('is-valid');
    signupPw.classList.add('is-invalid');
    invalidFeedback[1].style.visibility = 'visible';
    invalidFeedback[1].innerHTML = user['password'];
  } else {
    signupPw.classList.remove('is-invalid');
    signupPw.classList.add('is-valid');
    invalidFeedback[1].style.visibility = 'hidden';
  }

  if(user['conPassword'] && !user['password']) {
    signupConPw.classList.remove('is-valid');
    signupConPw.classList.add('is-invalid');
    invalidFeedback[2].style.visibility = 'visible';
    invalidFeedback[2].innerHTML = user['conPassword'];
  } else if(!user['conPassword'] && !user['password']){
    signupConPw.classList.remove('is-invalid');
    signupConPw.classList.add('is-valid');
    invalidFeedback[2].style.visibility = 'hidden';
  } else {
    signupConPw.classList.remove('is-valid');
    signupConPw.classList.add('is-invalid');
  }

}

/*
function signupValidate(user) {
  const usernameLen = user['username'].length;
  const passwordLen = user['password'].length;
  const errors = {
    username: false,
    password: false,
    conPassword: false,
    valid: true
  };

  if(usernameLen < 3 || usernameLen > 20) {
    //Also check username name is alphanum
    errors['username'] = 'Username must be between 3 & 20 chars and alphanum.';
  }

  if(passwordLen < 8 || passwordLen > 50) {
    //Also check pw meets pw requirements
    errors['password'] = 'Must contain at least 8 characters, 1 number, 1 lower and upper case letter.';
  }

  if(user['conPassword'] != user['password']) {
    errors['conPassword'] = 'Passwords do not match.';
  }

  for(property in errors) {
    if(errors[property] && property != 'valid') {
      errors['valid'] = false;
    }
  }

  return errors;
}
*/

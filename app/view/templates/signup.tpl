<!DOCTYPE html>
<html>
<head>
  <title>Sign up</title>
  <!-- CSS -->
  <!-- Bootstrap -->
  <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous'>
  <!-- General -->
  <link rel='stylesheet' href='/article-drafter/client/css/login&signup.css'>
  <link rel='stylesheet' href='/article-drafter/client/css/general.css' type='text/css'>

  <!-- JS -->
  <!-- General -->
  <script src='/article-drafter/client/js/page/signup.js'></script>
</head>
<body>

  {% include 'nav.tpl' %}

  <div class='container card border-0 shadow my-5 bg-light'>
    <div class='card-body px-5 pb-5 pt-0'>
      <h1 class='text-center mt-2'>Sign up</h1>
      <div id='mainDiv' class='card border-0 shadow my-3'>
        <div class='card-body p-3 form-signin'>

          <div class='form-group'>
            <div class='input-group'>
                <div class='input-group-prepend'>
                  <div class='input-group-text'>@</div>
                </div>
                <input id='signupUsername' type='text' class='form-control' placeholder='Username' maxlength='12'>
            </div>
            <div class='invalid-feedback'></div>
          </div>

          <div class='form-group'>
          <input id='signupPw' type='password' class='form-control' placeholder='Password'>
            <div class='invalid-feedback'></div>
          </div>

          <div class='form-group'>
            <input id='signupConPw' type='password' class='form-control' placeholder='Confirm Password'>
            <div class='invalid-feedback'></div>
          </div>

          <button class='btn btn-lg btn-primary btn-block text-uppercase' type='submit' onclick='signup()'>Sign up</button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

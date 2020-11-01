<!DOCTYPE html>
<html>
<head>
  <title>Log in</title>
  <!-- CSS -->
  <!-- Bootstrap -->
  <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous'>
  <!-- General -->
  <link rel='stylesheet' href='/articles/client/css/login&signup.css'>
  <link rel='stylesheet' href='/articles/client/css/general.css' type='text/css'>

  <!-- JS -->
  <!-- General -->
  <script src='/articles/client/js/page/login.js'></script>
</head>
<body>

  {% include 'nav.tpl' %}

  <div class='container card border-0 shadow my-5 bg-light'>
    <div class='card-body px-5 pb-5 pt-0'>
      <h1 class='text-center mt-2'>Log in</h1>
      <div id='mainDiv' class='card border-0 shadow my-3'>
        <div class='card-body p-3 form-signin'>

          <div class='form-group'>
            <div class='input-group'>
              <div class='input-group-prepend'>
                <div class='input-group-text'>@</div>
              </div>
              <input id='loginUsername' type='text' class='form-control' placeholder='Username'>
            </div>
            <div class='invalid-feedback'></div>
          </div>

          <div class='form-group'>
            <input id='loginPw' type='password' class='form-control' placeholder='Password'>
            <div class='invalid-feedback'></div>
          </div>

          <button class='btn btn-lg btn-primary btn-block text-uppercase' type='submit' onclick='login()'>Log in</button>

          <hr class='my-4'>

          <!-- <div>
            <button class='btn btn-lg btn-google btn-block text-uppercase mb-4' type='submit' onclick='loginGoogle()'><i class='fab fa-google mr-2'></i> Log in with Google</button>
            <button class='btn btn-lg btn-facebook btn-block text-uppercase mb-4' type='submit' onclick='loginFacebook()'><i class='fab fa-facebook-f mr-2'></i> Log in with Facebook</button>
          </div> -->

        </div>
      </div>
    </div>
  </div>

</body>
</html>

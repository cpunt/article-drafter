{% if username %}
<nav class='navbar bg-light nav-pills'>
  <div class='navbar-nav d-inline'>
    <span class='navbar-brand mb-0 h1'>Articles</span>
    <a class='d-inline nav-link mx-2 p-2' href='/articles/home'>Home</a>
    <a class='d-inline nav-link mx-2 p-2' href='/articles/createArticle'>Create Article</a>
  </div>

  <div class='dropdown'>
    <button class='btn btn-primary text-left' id='dropdownBtn'>{{username}}<span id='dropdownArrow' class='dropdown-toggle'></span></button>
    <div class='dropdown-menu w-100' id='dropdownDiv'>
      <a class='nav-link' href='/articles/profile/{{username}}/page/1'>My Profile</a>
      <a class='nav-link' href='/articles/drafts/page/1'>My Drafts</a>
      <a class='nav-link' href='#' onclick='logout()'>Logout</a>
    </div>
  </div>
</nav>
{% else %}
<nav class='navbar bg-light nav-pills'>
  <div class='navbar-nav d-inline'>
    <span class='navbar-brand mb-0 h1'>Articles</span>
    <a class='d-inline nav-link mx-2 p-2' href='/articles'>Home</a>
  </div>

  <div class='navbar-nav d-inline'>
    <a class='d-inline nav-link mx-2 p-2' href='/articles/login'>Log in</a>
    <a class='d-inline nav-link mx-2 p-2' href='/articles/signup'>Sign up</a>
  </div>
</nav>
{% endif %}

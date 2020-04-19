<!DOCTYPE html>
<html>
<head>
  <title>Articles</title>
  <!-- CSS -->
  <!-- Bootstrap -->
  <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous'>
  <!-- Highlight -->
  <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs.min.css'>
  <!-- Normal files -->
  <link rel='stylesheet' href='/articles/client/css/article.css' type='text/css'>
  <link rel='stylesheet' href='/articles/client/css/general.css' type='text/css'>
  <link rel='stylesheet' href='/articles/client/css/tag.css' type='text/css'>

  <!-- JS -->
  <!-- Marked -->
  <script src='https://cdn.jsdelivr.net/npm/marked/marked.min.js'></script>
  <!-- Highlight -->
  <script src='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js'></script>
  <!-- Normal files -->
  <script src='/articles/client/js/general/articleFunctions.js'></script>
  <script src='/articles/client/js/general/DisplayArticle.js'></script>
  <script src='/articles/client/js/general/usefulFunctions.js'></script>
  <script src='/articles/client/js/general/coreFunctions.js'></script>
  <script src='/articles/client/js/general/pageFunctions.js'></script>
</head>
<body>
  {% include 'nav.tpl' %}

  <div class='container card border-0 shadow my-4 bg-light'>
    <h1 class='text-center mt-2'>Articles</h1>
    <div class='card-body px-3 py-0'>
      <div class='card-header shadow bg-white' id='headingOne'>
          <p class='btn add-tags d-inline pl-0' type='button' onclick='displayTags()'>Add Tags</p>
          <span id='collapseArrow' class='arrow down' onclick='displayTags()'></span>
      </div>

      <div id='collapse' class='card border-0 shadow card-body pb-0'>
          {% include 'tagInput.tpl' %}
      </div>
    </div>
    <div id='articlesDiv' class='card-body px-3 pb-1 pt-0'></div>
    {% include 'pagination.tpl' %}
  </div>

  <script src='/articles/client/js/page/home.js'></script>
  <script src='/articles/client/js/general/tagFunctions.js'></script>
</body>
</html>

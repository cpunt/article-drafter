<!DOCTYPE html>
<html>
<head>
  <title>Drafts</title>
  <!-- CSS -->
  <!-- Bootstrap -->
  <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous'>
  <!-- Highlight -->
  <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs.min.css'>
  <!-- Normal files -->
  <link rel='stylesheet' href='/article-drafter/client/css/article.css' type='text/css'>
  <link rel='stylesheet' href='/article-drafter/client/css/general.css' type='text/css'>
  <link rel='stylesheet' href='/article-drafter/client/css/tag.css' type='text/css'>

  <!-- JS -->
  <!-- Marked -->
  <script src='https://cdn.jsdelivr.net/npm/marked/marked.min.js'></script>
  <!-- Highlight -->
  <script src='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js'></script>
  <!-- Normal files -->
  <script src='/article-drafter/client/js/general/articleFunctions.js'></script>
  <script src='/article-drafter/client/js/general/DisplayArticle.js'></script>
  <script src='/article-drafter/client/js/general/usefulFunctions.js'></script>
  <script src='/article-drafter/client/js/general/coreFunctions.js'></script>
  <script src='/article-drafter/client/js/general/pageFunctions.js'></script>
</head>
<body>
  {% include 'nav.tpl' %}

  <div class='container card border-0 shadow my-4 bg-light'>
    <h1 class='text-center mt-2'>My Drafts</h1>
    <div id='draftsDiv' class='card-body px-3 pb-1 pt-0'></div>
    {% include 'pagination.tpl' %}
  </div>

  <script src='/article-drafter/client/js/page/drafts.js'></script>
</body>
</html>

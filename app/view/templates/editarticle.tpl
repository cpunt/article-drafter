<!DOCTYPE html>
<html>
<head>
  <title>Edit Article</title>
  <!-- CSS -->
  <!-- Bootstrap -->
  <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous'>
  <!-- SimpleMDE -->
  <link rel='stylesheet' href='https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css'>
  <!-- Highlight -->
  <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs.min.css'>
  <!-- file -->
  <link rel='stylesheet' href='/article-drafter/client/css/article.css' type='text/css'>
  <link rel='stylesheet' href='/article-drafter/client/css/general.css' type='text/css'>
  <link rel='stylesheet' href='/article-drafter/client/css/validation.css' type='text/css'>
  <link rel='stylesheet' href='/article-drafter/client/css/tag.css' type='text/css'>

  <!-- JS -->
  <!-- SimpleMDE -->
  <script src='https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js'></script>
  <!-- Highlight -->
  <script src='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js'></script>
  <!-- file  -->
  <script src='/article-drafter/client/js/general/coreFunctions.js'></script>
  <script src='/article-drafter/client/js/general/usefulFunctions.js'></script>
  <script src='/article-drafter/client/js/general/validateArticleFunctions.js'></script>
</head>
<body>

  {% include 'nav.tpl' %}

  <div class='container card border-0 shadow my-4 bg-light'>
    <div id='articleDiv' class='card-body p-3'>
      <div class='card border-0 shadow my-3'>
        <div class='card-body'>
          <p id='lastSaved' class='saveLabel'></p>

          <div>
            <h3 id='editTitle' class='d-inline'><u></u></h3>
            <p id='editCreated' class='d-inline info float-right mr-4'></p>
          </div>
          <hr>

          <div class='form-group'>
            <textarea id='articleText' class='form-control' rows='8' placeholder='Article' maxlength='10000'></textarea>
            <div id='textFeedbackDiv' class='invalid-feedback'>
              Article needs to be between 100 and 10000 charaters long.
            </div>
          </div>

          {% include 'tagInput.tpl' %}

          <div id='buttonDiv'>
            <button class='btn btn-primary float-right' onclick="saveArticleAndRedirect()">Save Article</button>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </div>

  <script src='/article-drafter/client/js/general/autosave.js'></script>
  <script src='/article-drafter/client/js/general/tagFunctions.js'></script>
  <script src='/article-drafter/client/js/page/editArticle.js'></script>
</body>
</html>

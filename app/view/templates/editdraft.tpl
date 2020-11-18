<!DOCTYPE html>
<html>
<head>
  <title>Edit Draft</title>
  <!-- CSS -->
  <!-- Bootstrap -->
  <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous'>
  <!-- SimpleMDE -->
  <link rel='stylesheet' href='https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css'>
  <!-- Highlight -->
  <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs.min.css'>
  <!-- <link rel='stylesheet' href='https://cdn.jsdelivr.net/highlight.js/latest/styles/github.min.css'> -->
  <!-- Normal -->
  <link rel='stylesheet' href='/article-drafter/client/css/validation.css' type='text/css'>
  <link rel='stylesheet' href='/article-drafter/client/css/general.css' type='text/css'>
  <link rel='stylesheet' href='/article-drafter/client/css/tag.css' type='text/css'>

  <!-- JS -->
  <!-- SimpleMDE -->
  <script src='https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js'></script>
  <!-- Highlight -->
  <script src='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js'></script>
  <!-- Normal -->
  <script src='/article-drafter/client/js/general/coreFunctions.js'></script>
  <script src='/article-drafter/client/js/general/usefulFunctions.js'></script>
  <script src='/article-drafter/client/js/general/validateDraftFunctions.js'></script>
</head>
<body>

  {% include 'nav.tpl' %}

  <div class='container card border-0 shadow my-4 bg-light'>
    <h1 class='text-center my-1'>Edit Draft</h1>
    <div class='card-body px-3 pb-3 pt-0'>
      <div class='card border-0 shadow my-3'>
        <div class='card-body p-3 bg-white'>
          <div class='my-3'>
            {% include 'articleInputs.tpl' %}

            {% include 'tagInput.tpl' %}
            <div>
              <button class='btn btn-primary text-center float-right' onclick='saveArticleAndRedirect(true)'>Create Article</button>
              <button class='btn btn-primary text-center float-right mr-3' onclick='saveDraftAndRedirect()'>Save Draft</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src='/article-drafter/client/js/general/autosave.js'></script>
  <script src='/article-drafter/client/js/general/tagFunctions.js'></script>
  <script src='/article-drafter/client/js/general/save.js'></script>
  <script src='/article-drafter/client/js/page/edit.js'></script>
</body>
</html>

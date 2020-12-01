function validArticle(title, text, tags) {
  const validTitle = validateArticleTitle(title);
  const validText = validateArticleText(text);
  const validTags = validateArticleTags(tags);

  return validTitle && validText && validTags;
}

function validateArticleTitle(title) {
  const titleLen = title.length;
  const articleTitle = document.getElementById('title');
  const titleFeedbackDiv = document.getElementById('titleFeedbackDiv');

  if(titleLen == 0 || titleLen > 100) {
    articleTitle.classList.add('is-invalid');
    titleFeedbackDiv.innerHTML = 'Title needs to be between 1 and 100 characters long';

    return false;
  } else {
    articleTitle.classList.remove('is-invalid');
    titleFeedbackDiv.innerHTML = '';

    return true;
  }
}

function validateArticleText(text) {
  const textLen = text.length;
  const codeMirror = document.getElementsByClassName('CodeMirror')[0];
  const textFeedbackDiv = document.getElementById('textFeedbackDiv');

  if(textLen < 100 || textLen > 10000) {
    codeMirror.classList.add('codemirror-invalid');
    textFeedbackDiv.innerHTML = 'Article needs to be between 100 and 10000 charaters long';

    return false;
  } else {
    codeMirror.classList.remove('codemirror-invalid');
    textFeedbackDiv.innerHTML = '';

    return true;
  }
}

function validateArticleTags(tags) {
  const tagsLen = tags.length;
  const articleTags = document.getElementById('articleTags');
  const tagFeedbackDiv = document.getElementById('tagFeedbackDiv');

  if(tagsLen == 0 || tagsLen > 5) {
    articleTags.classList.add('is-invalid');
    tagFeedbackDiv.innerHTML = 'Article needs between 1 and 5 tags';

    return false;
  } else {
    articleTags.classList.remove('is-invalid');
    tagFeedbackDiv.innerHTML = '';

    return true;
  }
}

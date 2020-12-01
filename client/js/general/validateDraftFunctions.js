function validDraft(title, text, tags) {
  const validTitle = validateDraftTitle(title);
  const validText = validateDraftText(text);
  const validTags = validateDraftTags(tags);

  return validTitle && validText && validTags;
}

function validateDraftTitle(title) {
  const titleLen = title.length;
  const articleTitle = document.getElementById('title');
  const titleFeedbackDiv = document.getElementById('titleFeedbackDiv');

  if(titleLen > 100) {
    articleTitle.classList.add('is-invalid');
    titleFeedbackDiv.innerHTML = "Draft title can't have more than 100 characters";

    return false;
  } else {
    articleTitle.classList.remove('is-invalid');
    titleFeedbackDiv.innerHTML = '';

    return true;
  }
}

function validateDraftText(text) {
  const textLen = text.length;
  const codeMirror = document.getElementsByClassName('CodeMirror')[0];
  const textFeedbackDiv = document.getElementById('textFeedbackDiv');

  if(textLen > 20000) {
    codeMirror.classList.add('codemirror-invalid');
    textFeedbackDiv.innerHTML = "Draft text can't have more than 20000 characters";

    return false;
  } else {
    codeMirror.classList.remove('codemirror-invalid');
    textFeedbackDiv.innerHTML = '';

    return true;
  }
}

function validateDraftTags(tags) {
  const tagsLen = tags.length;
  const articleTags = document.getElementById('articleTags');
  const tagFeedbackDiv = document.getElementById('tagFeedbackDiv');

  if(tagsLen > 5) {
    articleTags.classList.add('is-invalid');
    tagFeedbackDiv.innerHTML = "Draft can't have more than 5 tags";

    return false;
  } else {
    articleTags.classList.remove('is-invalid');
    tagFeedbackDiv.innerHTML = '';

    return true;
  }
}

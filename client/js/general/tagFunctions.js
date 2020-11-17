function observe() {
  const tagsDiv = document.getElementById('tagsDiv');
  const config = {
    attributes: true,
    childList: true,
    subtree: true
  };

  const observer = new MutationObserver(tagsDivChange);
  observer.observe(tagsDiv, config);
}

function tagsDivChange() {
  const tag = document.getElementsByClassName('tag');
  const articleTags = document.getElementById('articleTags');
  const articleBtn = document.getElementById('articleBtn');

  if(tag && tag.length == 5) {
    articleTags.disabled = true;
    articleBtn.disabled = true;
    removeTagEvent();
  } else {
    articleTags.disabled = false;
    articleBtn.disabled = false;
    addTagEvent();
  }
}

function addTagEvent() {
  document.getElementById('articleTags').addEventListener('keydown', tagEvent);
}

function removeTagEvent() {
  document.getElementById('articleTags').removeEventListener('keydown', tagEvent);
}

function tagEvent(e) {
  if(e.keyCode == 13) {
    addTag();
  }
}

function addTag() {
  const tagsDiv = document.getElementById('tagsDiv');
  const headingOne = document.getElementById('headingOne');
  const articleTags = document.getElementById('articleTags');
  const tagName = articleTags.value.trim();

  reset();

  if(validateTag(tagName)) {
    tagsDiv.innerHTML += tagHTML(tagName);
  }
}

function tagHTML(tagName) {
  const html = `
  <span class='badge badge-primary'>
    <p class='editTag tag'>${tagName}</p>
    <button type='button' class='close cross' aria-label='Close' onclick='deleteTag(this)'>
      <span aria-hidden='true'>&times;</span>
    </button>
  </span>`;

  return html;
}

function deleteTag(e) {
  reset();
  e.parentNode.remove();
}

function validateTag(tagName) {
  const tag = document.getElementsByClassName('editTag');
  let warning;

  if(!tagName.match(/^[a-zA-Z0-9 ]*$/i) || tagName.length < 2 || tagName.length > 20) {
    warning = 'Tag can only contain letters and numbers and be between 2 and 20 characters.';
  }

  if(tag) {
    for(let i = 0; i < tag.length; i++) {
      if(tag[i].innerHTML == tagName) {
        warning = 'Cannot have same tag twice.';
        break;
      }
    }
  }

  if(warning) {
    tagsWarning(warning);

    return false;
  }

  return true;
}

function tagsWarning(warning) {
  const articleTags = document.getElementById('articleTags');
  const tagFeedbackDiv = document.getElementById('tagFeedbackDiv');

  tagFeedbackDiv.style.visibility = 'visible';
  articleTags.classList.add('is-invalid');
  tagFeedbackDiv.innerHTML = warning;
}

function reset() {
  const articleTags = document.getElementById('articleTags');
  const tagFeedbackDiv = document.getElementById('tagFeedbackDiv');

  articleTags.value = '';
  tagFeedbackDiv.style.visibility = 'hidden';
  articleTags.classList.remove('is-invalid');
  articleTags.classList.remove('is-valid');
}

function displayTags() {
  const collapse = document.getElementById('collapse');
  const collapseArrow = document.getElementById('collapseArrow');

  if(collapse.style.display == 'block') {
    collapse.style.display = '';
    collapseArrow.classList.add('down');
    collapseArrow.classList.remove('up');
  } else {
    collapse.style.display = 'block';
    collapseArrow.classList.remove('down');
    collapseArrow.classList.add('up');
  }
}

function observe() {
  const tagsDiv = document.getElementById('tagsDiv');
  const config = {
    attributes: true,
    childList: true,
    subtree: true
  };

  const observer = new MutationObserver(tagsDivChange);
  observer.observe(tagsDiv, config);
}

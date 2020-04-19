let simplemde = new SimpleMDE({
  toolbar: [
    'bold', 'italic', 'heading','|',
    'code', 'table', '|',
    'quote', 'unordered-list', 'ordered-list', '|',
    'link', 'image', '|',
    'preview', 'side-by-side', 'fullscreen', '|',
    'guide'
  ],
  renderingConfig: {
		singleLineBreaks: false,
		codeSyntaxHighlighting: true,
	}
});

function obeserve() {
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

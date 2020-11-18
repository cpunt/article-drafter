class AutosaveFlags {
  constructor () {
    this.title = false;
    this.text = false;
    this.tags = false;
  }

  isFlagSet () {
    return this.title || this.text || this.tags;
  }

  setTitleFlag () {
    this.title = true;
  }

  setTextFlag () {
    this.title = true;
  }

  setTagsFlag () {
    this.title = true;
  }

  resetFlags () {
    this.title = false;
    this.text = false;
    this.tags = false;
  }
}

const autosaveFlags = new AutosaveFlags();
const simplemde = newSimplemde();

function newSimplemde () {
  return new SimpleMDE({
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
}

function setFlag (name) {
  switch (name) {
    case 'title':
      autosaveFlags.setTitleFlag();
      break;
    case 'text':
      autosaveFlags.setTextFlag();
      break;
    case 'tags':
      autosaveFlags.setTagsFlag();
      break;
  }
}

function setAutosave (callback) {
  const title = document.getElementById('title');
  const text = simplemde;
  const tags = document.getElementById('tagsDiv');

  title.addEventListener('input', () => setFlag('title'));
  text.codemirror.on('change', () => setFlag('text'));
  tags.addEventListener('DOMNodeRemoved', () => setFlag('tags'));

  // Auto save ever 10 seconds
  setInterval(() => {
    if (!autosaveFlags.isFlagSet()) {
      console.log('No updates');
    } else {
      console.log('saved');
      autosaveFlags.resetFlags();
      callback();
    }
  }, 10000);
}

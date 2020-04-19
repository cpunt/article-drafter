window.onload = function() {
  load();
  obeserve();
}

function load() {
  const ref = getRef();
  const request = {
    type: 'edit',
    ref: ref
  };

  if(!ref) {
    window.location.href = '../';
  } else {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', `/articles/index.php?load=${JSON.stringify(request)}`, true);

    xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        const res = JSON.parse(xmlhttp.responseText);

        if(!res['valid']) {
          window.location.href = '/articles/home/page/1';
        } else {
          if(res['draft']) {
            draftHTML(res['item']);
          } else {
            articleHTML(res['item']);
          }

          hljs.initHighlighting();
        }
      }
    }

    xmlhttp.send();
  }
}

function update(draft, type) {
  const ref = getRef();
  const title = draft ? document.getElementById('title').value : '';
  const text = simplemde.value();
  const tag = document.getElementsByClassName('tag');
  const tags = [];

  if(tag) {
    for(let i = 0; i < tag.length; i++) {
      tags.push(tag[i].innerHTML);
    }
  }

  const request = {
    type: type,
    ref: ref,
    title: title,
    text: text,
    tags: tags,
    draft: draft
  };

  if(type == 'updateArticle') {
    let titleValid;
    const textValid = validateText(text);
    const tagsValid = validateTags(tags, 5);

    if(draft) {
      titleValid = validateTitle(title);

      if (!titleValid) {
        return;
      }
    }

    if(!textValid || !tagsValid) {
      return;
    }
  }

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('PATCH', `/articles/index.php`, true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const res = JSON.parse(xmlhttp.responseText);

      if(!res['valid']) {
        window.location.href = `/articles/home`;
        return;
      }

      if(res['updated']) {
        if(res['type'] == 'draft') {
          window.location.href = '/articles/drafts/page/1';
        } else {
          window.location.href = `/articles/article/${res['updated']}`;
        }
      } else {
        throw new Error('Invalid Input');
      }
    }
  }

  xmlhttp.send('edit=' + encodeURIComponent(JSON.stringify(request)));
}

function articleHTML(item) {
  const editTitle = document.getElementById('editTitle');
  const editCreated = document.getElementById('editCreated');
  const badges = document.getElementById('badges');
  const tagsDiv = document.getElementById('tagsDiv');

  editTitle.innerHTML = `<u>${item.title}</u>`;
  simplemde.value(item.text);
  editCreated.innerHTML = `Posted on ${item.created} by <a href='/articles/profile/${item.username}'>${item.username}</a>`;

  for(let i = 0; i < item.tags.length; i++) {
    tagsDiv.innerHTML += tagHTML(item.tags[i]);
  }
}

function draftHTML(item) {
  const title = document.getElementById('title');
  title.value = item.title;

  simplemde.value(item.text);
  hljs.initHighlighting();

  for(let i = 0; i < item.tags.length; i++) {
    tagsDiv.innerHTML += tagHTML(item.tags[i]);
  }
}

function cancel(draft) {
  if(draft) {
    window.location.href = '/articles/drafts/page/1';
  } else {
    const ref = getRef();
    window.location.href = `/articles/article/${ref}`;
  }
}

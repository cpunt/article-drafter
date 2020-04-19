window.onload = function() {
  const request = getRequest();
  load(request);
}

function load(request) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', `/articles/index.php/?loadPage=${JSON.stringify(request)}`, true);

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const res = JSON.parse(xmlhttp.responseText);
      const pagination = res['pagination'];
      const drafts = res['items'];
      const url = `/articles/drafts/page/${pagination['page']}`
      window.history.pushState('page', '', url)

      if(res['validRequest']) {
        displayDrafts(drafts);
      } else {
        window.location.href = `/articles`;
      }

      displayPaginationDiv(pagination);
    }
  }

  xmlhttp.send();
}

function displayDrafts(drafts) {
  const draftsDiv = document.getElementById('draftsDiv');
  draftsDiv.innerHTML = '';

  if(drafts.length == 0) {
    draftsDiv.innerHTML = `
    <div class='articleDiv card border-0 shadow my-3'>
      <div class='card-body p-3'>
        <p class='lead'><strong>You have 0 drafts</strong></p>
      </div>
    </div>
    `;
  } else {
    for(let i = 0; i < drafts.length; i++) {
      draftsDiv.innerHTML += `
      <div class='card border-0 shadow my-3 py-3'>
        <div class='d-inline'>
          <a href='/articles/editdraft/${drafts[i].articleref}' class='ml-3 d-inline'>${drafts[i].title.length > 0 ? drafts[i].title : 'Untitled'}</a>
          <img class='d-inline float-right mr-3 icon' src='/articles/client/assets/delete.svg' width='24' height='24' onclick="deleteDraft('${drafts[i].articleref}')">
        </div>
      </div>
      `
    }
  }
}

function deleteDraft(ref) {
  if (confirm('Are you sure you want to delete this draft? This cannot be undone.')) {

    const request = {
      type: 'delete',
      ref: ref
    };

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('DELETE', '/articles/index.php', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        const res = JSON.parse(xmlhttp.responseText);

        if(res['valid']) {
          if(res['deleted']) {
            location.reload();
          } else {
            throw new Error('Error deleting');
          }
        }
      }
    }

    xmlhttp.send(`edit=${JSON.stringify(request)}`);
  }
}

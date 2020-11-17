window.onload = function() {
  load(getRequest());
}

async function load(data) {
  const request = await fetch(`/article-drafter/index.php/?loadPage=${JSON.stringify(data)}`, {
    method: 'GET'
  });
  const response = JSON.parse(await request.text());
  window.history.pushState('page', '', `/article-drafter/drafts/page/${response['pagination']['page']}`);

  if(!response['valid']) {
    window.location.href = `/article-drafter/home/page/1`;
  } else {
    displayDrafts(response['articles']);
    displayPaginationDiv(response['pagination']);
  }
}

async function deleteDraft(ref) {
  if (confirm('Are you sure you want to delete this draft? This cannot be undone.')) {

    const data = {
      type: 'delete',
      ref: ref
    };
    const request = await fetch('/article-drafter/index.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `edit=${JSON.stringify(data)}`
    });
    const response = JSON.parse(await request.text());

    if(response['valid']) {
      if(response['deleted']) {
        location.reload();
      } else {
        throw new Error('Error deleting');
      }
    }
  }
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
          <a href='/article-drafter/editdraft/${drafts[i].articleref}' class='ml-3 d-inline'>${drafts[i].title.length > 0 ? drafts[i].title : 'Untitled'}</a>
          <img class='d-inline float-right mr-3 icon' src='/article-drafter/client/assets/delete.svg' width='24' height='24' onclick="deleteDraft('${drafts[i].articleref}')">
        </div>
      </div>
      `;
    }
  }
}

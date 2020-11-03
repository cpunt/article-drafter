async function deleteArticle(articleRef) {
  if (confirm('Are you sure you want to delete this article? This cannot be undone.')) {
    const data = {
      type: 'delete',
      ref: articleRef
    }

    const request = await fetch('/articles/index.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `edit=${encodeURIComponent(JSON.stringify(data))}`
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

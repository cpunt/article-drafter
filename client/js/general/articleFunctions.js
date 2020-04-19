function deleteArticle(articleref) {
  if (confirm('Are you sure you want to delete this article? This cannot be undone.')) {
    const editData = {
      type: 'delete',
      ref: articleref
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

    xmlhttp.send(`edit=${JSON.stringify(editData)}`);
  }
}

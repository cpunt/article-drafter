class DisplayArticle {

  getArticleHTML(article, type) {
    let html = `
    <div class='articleDiv card border-0 shadow my-3'>
      <div class='card-body p-3'>
        <div>
          <h3 class='d-inline'><u>${article.title}</u></h3>
          <p class='d-inline info float-right mr-4'>Posted on ${this.formatDate(article.created)} by <a href='/article-drafter/profile/${article.username}'>${article.username}</a></p>
        </div>
        <hr>`;

    switch(type) {
      case 'article':
        html += this.getArticleCore(article);
        break;
      case 'articles':
        html += this.getArticlesCore(article);
        break;
    }

    html += `<div>
    <p class='tagsHeader mr-1'>Tags:</p>`;

    for(let i = 0; i < article.tags.length; i++) {
      html += `
      <span class='badge badge-primary'>
        <p class='tag'>${article.tags[i]}</p>
      </span>`;
    }

    html += `
        </div>
      </div>
    </div>`;

    if(type == 'articles') {
      html += `<hr>`;
    }

    return html;
  }

  getArticleCore(article) {
    const text = marked(article.text);

    let html = `
    <div class='lead'>
      ${text}
    </div>
    <div class='optionsBar'>`;

    if(article['editable']) {
      html += `
        <a class='float-right' href='/article-drafter/editarticle/${article.articleref}'>Edit</a>
        <p class='float-right mr-4 delete-btn' onclick='deleteArticle("${article.articleref}")'>Delete</p>`;
    }

    html += `
    </div>
    <hr class='my-2'>`;

    return html;
  }

  getArticlesCore(article) {
    const text = marked(article.text);

    let html = `
    <div>
      <div class='articleText fadeout lead'>
        ${text}
      </div>
    </div>
    <div class='optionsBar' class='mt-2 more label'>
      <a href='/article-drafter/article/${article.articleref}'>Read more</a>`;

    if(article['editable']) {
      html += `
      <a class='float-right' href='/article-drafter/editarticle/${article.articleref}'>Edit</a>
      <p class='float-right mr-4 delete-btn' onclick='deleteArticle("${article.articleref}")'>Delete</p>`
    }

    html += `
    </div>
    <hr>`;

    return html;
  }

  getNullHTML(type) {
    let message;

    switch(type) {
      case 'posts':
        message = 'No articles have been made.';
        break;
      case 'tags':
        message = 'No articles with these tags.';
        break;
      case 'user':
        message = 'User has no articles.'
        break;
      case 'invalidUser':
        message = 'User doesn\'t exist.'
        break;
    }

    const html = `
    <div class='articleDiv card border-0 shadow my-3'>
      <div class='card-body p-3'>
        <p class='lead'><strong>${message}</strong></p>
      </div>
    </div>
    `;

    return html;
  }

  formatDate(timestamp)  {
    const date = new Date(timestamp);
    let day = date.getDate();
    let month = date.getMonth() + 1;

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;

    return `${day}/${month}/${date.getFullYear()}`;
  }
}

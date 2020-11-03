async function logout() {
  const request = await fetch('/articles/index.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'logout=true'
  });
  const response = JSON.parse(await request.text());

  if(response['logout']) {
    window.location.href = '/articles/home';
  }
}

document.addEventListener('click', function(e) {
  const target = e.target;
  const dropdownDiv = document.getElementById('dropdownDiv');

  if(dropdownDiv) {
    const dropdownArrow = document.getElementById('dropdownArrow');
    if(target.id == 'dropdownBtn' || target.parentNode.id == 'dropdownBtn') {

      if(dropdownDiv.style.display == 'block') {
        dropdownDiv.style.display = '';
        dropdownArrow.style.transform = '';
      } else {
        dropdownDiv.style.display = 'block';
        dropdownArrow.style.transform = 'rotate(180deg)';
      }
    } else if(target.parentNode.id != 'dropdownDiv') {
      dropdownArrow.style.transform = '';
      dropdownDiv.style.display = '';
    }
  }
});

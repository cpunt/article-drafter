function logout() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', '/articles/index.php', true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const res = JSON.parse(xmlhttp.responseText);

      if(res['logout']) {
        window.location.href = '/articles/home';
      }
    }
  }

  xmlhttp.send('logout=true');
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

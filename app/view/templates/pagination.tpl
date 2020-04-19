<nav class='px-3 pb-3'>
  <ul class='pagination'>
    <li class='page-item'>
      <button id='prevPage' class='page-link' aria-label='Previous' onclick='previousPage()'>
        <span aria-hidden='true'>&laquo;</span>
        <span class='sr-only'>Previous</span>
      </button>
    </li>
    <li class='page-item'><button class='page-link pageNumbers' onclick='pageNumber(this)'>1</button></li>
    <li class='page-item'><button class='page-link pageNumbers' onclick='pageNumber(this)'>2</button></li>
    <li class='page-item'><button class='page-link pageNumbers' onclick='pageNumber(this)'>3</button></li>
    <li class='page-item'>
      <button id='nextPage' class='page-link' aria-label='Next' onclick='nextPage()'>
        <span aria-hidden='true'>&raquo;</span>
        <span class='sr-only'>Next</span>
      </button>
    </li>
  </ul>
</nav>

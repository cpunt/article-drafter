<div>
  <p id='lastSaved' class='saveLabel'></p>

  <div class='form-group max-width'>
    <input id='title' name='title' class='form-control' placeholder='Title' maxlength='100'></input>
    <div id='titleFeedbackDiv' class='invalid-feedback'>
      Title needs to be between 1 and 100 characters long.
    </div>
  </div>

  <div class='form-group max-width'>
    <textarea oninput='flagUpdate()' id='text' name='text' class='form-control' rows='8' placeholder='Article' maxlength='10000'></textarea>
    <div id='textFeedbackDiv' class='invalid-feedback'>
      Article needs to be between 100 and 10000 charaters long.
    </div>
  </div>
</div>

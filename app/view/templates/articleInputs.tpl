<div>
  <p id='lastSaved' class='saveLabel'></p>

  <div class='form-group max-width'>
    <input id='title' name='title' class='form-control' placeholder='Title' maxlength='100'></input>
    <div id='titleFeedbackDiv' class='invalid-feedback'></div>
  </div>

  <div class='form-group max-width'>
    <textarea oninput='flagUpdate()' id='text' name='text' class='form-control' rows='8' placeholder='Article' maxlength='10000'></textarea>
    <div id='textFeedbackDiv' class='invalid-feedback'></div>
  </div>
</div>

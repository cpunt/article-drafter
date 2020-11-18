<?php
namespace model;

class CreateModel extends \db\Database {
  private $iduser, $title, $text, $tags;

  public function __construct($iduser, $title, $text, $tags) {
    parent::__construct();
    $this->iduser = $iduser;
    $this->title = $title;
    $this->text = $text;
    $this->tags = $tags;
  }

  public function createDraft () {
    if (!$this->validateDraftCreate()) return false;

    $date = new \DateTime();
    $timeStamp = $date->getTimestamp();
    $timeSaved = date('Y-m-d H:i:s', $timeStamp);
    $articleRef = 'ts' . $timeStamp . 'id' . uniqid();

    $query = "INSERT INTO articles(articleref, title, text, tags, iduser, draft, lastSaved)
    VALUES(?, ?, ?, ?, ?, 1, ?)";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('ssssss', $articleRef, $this->title, $this->text, json_encode($this->tags), $this->iduser, $timeSaved);
    $execution = $stmt->execute();
    $stmt->close();

    $created['lastSaved'] = $timeSaved;
    $created['articleRef'] = $articleRef;

    return $execution ? $created : false;
  }

  public function validateDraftCreate () {
    if (strlen($this->title) > 100) return false;
    if (strlen($this->text) > 20000) return false;
    if (count($this->tags) > 5 || count($this->tags) != count(array_unique($this->tags))) return false;

    foreach($this->ags as $tag) {
      if (strlen($tag) < 2 || strlen($tag) > 20) return false;
      if (!ctype_alnum(str_replace(' ', '', $tag))) return false;
    }

    return true;
  }
}
/*
private function getTextLength() {
  $length = 0;

  for($i = 0; $i < strlen($this->text); $i++) {
    if($this->text[$i] != ' ') {
      $length++;
    }
  }

  return $length;
}

public function isArticleCreationValid() {
  $titleLen = strlen($this->title);
  $textLen = $this->getTextLength();
  $tagsCount = count($this->tags);
  $unique = array_unique($this->tags);

  if($titleLen == 0 || $titleLen > 100 ) {
    return false;
  }

  if($textLen < 100 || $textLen > 10000) {
    return false;
  }

  if($tagsCount == 0 || $tagsCount > 5 || $tagsCount != count($unique)) {
    return false;
  }

  foreach($this->tags as $tag) {
    $tagLen = strlen($tag);
    if($tagLen < 2 || $tagLen > 20 || !ctype_alnum(str_replace(' ', '', $tag))) {
      return false;
    }
  }

  if(!$this->iduser) {
    return false;
  }

  return true;
}

public function createArticle() {
  date_default_timezone_set('Europe/London');
  $created = date('d/m/y');
  $date = new \DateTime();
  $articleRef = 'ts' . $date->getTimestamp() . 'id' . uniqid();

  $query = "INSERT INTO articles(articleref, title, text, iduser, draft, created)
  VALUES(?, ?, ?, ?, ?, ?)";
  $stmt = ($this->conn)->prepare($query);
  $stmt->bind_param('ssssss', $articleRef, $this->title, $this->text, $this->iduser, $this->draft, $created);
  $execution = $stmt->execute();
  $stmt->close();

  if($execution) {
    $this->insertTags($articleRef);
    return $articleRef;
  } else {
    return false;
  }
}
*/

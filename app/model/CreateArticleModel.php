<?php
namespace model;

class CreateArticleModel extends \db\Database {
  private $title,
          $text,
          $tags,
          $draft,
          $iduser;

  public function __construct($title, $text, $tags, $draft, $iduser) {
    parent::__construct();
    $this->title = $title;
    $this->text = $text;
    $this->tags = $tags;
    $this->draft = $draft;
    $this->iduser = $iduser;
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

  private function insertTags($articleRef) {
    $query = "INSERT INTO tags(tag, articleref)
    VALUES(?, ?)";

    for($i = 0; $i < count($this->tags); $i++) {
      $stmt = ($this->conn)->prepare($query);
      $stmt->bind_param('ss', $this->tags[$i], $articleRef);
      $stmt->execute();
      $stmt->close();
    }
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

  private function getTextLength() {
    $length = 0;

    for($i = 0; $i < strlen($this->text); $i++) {
      if($this->text[$i] != ' ') {
        $length++;
      }
    }

    return $length;
  }
}

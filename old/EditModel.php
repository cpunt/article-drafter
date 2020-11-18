<?php
namespace model;

class EditModel extends \db\Database {
  private $iduser,
          $ref;

  public function __construct($iduser, $ref) {
    parent::__construct();
    $this->iduser = $iduser;
    $this->ref = $ref;
  }

  public function updateArticle($text, $tags) {
    $query = "UPDATE articles
    SET text = ?
    WHERE iduser = ?
    AND articleref = ?";
    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('sss', $text, $this->iduser, $this->ref);
    $execution = $stmt->execute();
    $stmt->close();

    if($execution) {
      $this->updateTags($tags);
      return $this->ref;
    } else {
      return false;
    }
  }

  public function updateDraft($convert, $title, $text, $tags) {
    if($convert) {
      $query = "UPDATE articles
      SET title = ?, text = ?, draft = 0, created = ?
      WHERE iduser = ?
      AND articleref = ?";
    } else {
      $query = "UPDATE articles
      SET title = ?, text = ?
      WHERE iduser = ?
      AND articleref = ?";
    }

    $stmt = ($this->conn)->prepare($query);

    if($convert) {
      date_default_timezone_set('Europe/London');
      $created = date('d/m/y');
      $stmt->bind_param('sssss', $title, $text, $created, $this->iduser, $this->ref);
    } else {
      $stmt->bind_param('ssss', $title, $text, $this->iduser, $this->ref);
    }

    $execution = $stmt->execute();
    $stmt->close();

    if($execution) {
      $this->updateTags($tags);
      return $this->ref;
    } else {
      return false;
    }
  }

  public function delete() {
    $query = "DELETE FROM articles
    WHERE iduser = ?
    AND articleref = ?";
    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('ss', $this->iduser, $this->ref);
    $stmt->execute();
    $stmt->close();

    return true;
  }

  public function validateEdit() {
    $query = "SELECT text
    FROM articles
    WHERE iduser = ?
    AND articleref = ?";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('ss', $this->iduser, $this->ref);
    $stmt->execute();
    $stmt->store_result();
    $rows = $stmt->num_rows;
    $stmt->close();

    if($rows == 1) {
      return true;
    } else {
      return false;
    }
  }

  public function validateArticleUpdate($text, $tags) {
    $textLen = strlen($text);
    $tagsLen = count($tags);
    $unique = array_unique($tags);

    if($textLen < 100 && $textLen > 10000) {
      return false;
    }

    if($tagsLen == 0 || $tagsLen > 5 || $tagsLen != count($unique)) {
      return false;
    }

    foreach($tags as $tag) {
      $tagLen = strlen($tag);
      if($tagLen < 2 || $tagLen > 20 || !ctype_alnum(str_replace(' ', '', $tag))) {
        return false;
      }
    }

    return true;
  }

  public function validateDraftUpdate($title, $text, $tags) {
    $titleLen = strlen($title);
    $textLen = strlen($text);
    $tagsLen = count($tags);
    $unique = array_unique($tags);

    if($titleLen > 100) {
      return false;
    }

    if($textLen > 20000) {
      return false;
    }

    if($tagsLen > 5 || $tagsLen != count($unique)) {
      return false;
    }

    foreach($tags as $tag) {
      $tagLen = strlen($tag);
      if($tagLen < 2 || $tagLen > 20 || !ctype_alnum(str_replace(' ', '', $tag))) {
        return false;
      }
    }

    return true;
  }

  public function validateArticleTitle($title) {
    $titleLen = strlen($title);

    if($titleLen == 0 || $titleLen > 100 ) {
      return false;
    }

    return true;
  }

  private function updateTags($tags) {
    $this->deleteTags();

    $query = "INSERT INTO tags(tag, articleref)
    VALUES(?, ?)";

    for($i = 0; $i < count($tags); $i++) {
      $stmt = ($this->conn)->prepare($query);
      $stmt->bind_param('ss', $tags[$i], $this->ref);
      $stmt->execute();
      $stmt->close();
    }
  }

  private function deleteTags() {
    $query = "DELETE FROM tags
    WHERE articleref = ?";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->ref);
    $stmt->execute();
    $stmt->close();
  }
}

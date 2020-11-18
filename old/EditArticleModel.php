<?php
namespace model;

class EditArticleModel extends \db\Database {
  private $iduser,
          $articleref;

  public function __construct($iduser, $articleref) {
    parent::__construct();
    $this->iduser = $iduser;
    $this->articleref = $articleref;
  }

  public function updateArticle($text, $tags) {
    if($this->isArticleUpdateValid($texts, $tags)) {
      $query = "UPDATE articles
      SET text = ?
      WHERE iduser = ?
      AND articleref = ?";
      $stmt = ($this->conn)->prepare($query);
      $stmt->bind_param('sss', $text, $this->iduser, $this->articleref);
      $execution = $stmt->execute();
      $stmt->close();

      if($execution) {
        $this->updateTags($tags);
        return $this->articleref;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public function deleteArticle() {
    $query = "DELETE FROM articles
    WHERE iduser = ?
    AND articleref = ?";
    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('ss', $this->iduser, $this->articleref);
    $stmt->execute();
    $stmt->close();

    return true;
  }

  public function validEdit() {
    $query = "SELECT text
    FROM articles
    WHERE iduser = ?
    AND articleref = ?";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('ss', $this->iduser, $this->articleref);
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

  private function isArticleUpdateValid($text, $tags) {
    $textLen = $this->getTextLength($text);
    $tagsCount = count($tags);
    $unique = array_unique($tags);

    if($textLen < 100 && $textLen > 10000) {
      return false;
    }

    if($tagsCount == 0 || $tagsCount > 5 || $tagsCount != count($unique)) {
      return false;
    }

    foreach($tags as $tag) {
      $tagLen = strlen($tag);
      if($tagLen < 2 || $tagLen > 15 || !ctype_alnum($tag)) {
        return false;
      }
    }

    return true;
  }

  private function getTextLength($text) {
    $length = 0;

    for($i = 0; $i < strlen($text); $i++) {
      if($text[$i] != ' ') {
        $length++;
      }
    }

    return $length;
  }

  private function updateTags($tags) {
    $this->deleteTags();

    $query = "INSERT INTO tags(tag, articleref)
    VALUES(?, ?)";

    for($i = 0; $i < count($tags); $i++) {
      $stmt = ($this->conn)->prepare($query);
      $stmt->bind_param('ss', $tags[$i], $this->articleref);
      $stmt->execute();
      $stmt->close();
    }
  }

  private function deleteTags() {
    $query = "DELETE FROM tags
    WHERE articleref = ?";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->articleref);
    $stmt->execute();
    $stmt->close();
  }
}

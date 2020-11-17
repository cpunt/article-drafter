<?php
namespace model;

class TagsModel extends \db\Database {
  private $ref,
          $tags;

  public function __construct ($ref, $tags) {
    parent::__construct();
    $this->ref = $ref;
    $this->tags = $tags;
  }

  public function save () {
    $this->delete();

    $query = "INSERT INTO tags(tag, articleref)
    VALUES(?, ?)";

    for($i = 0; $i < count($this->tags); $i++) {
      $stmt = ($this->conn)->prepare($query);
      $stmt->bind_param('ss', $this->tags[$i], $this->ref);
      $stmt->execute();
      $stmt->close();
    }
  }

  private function delete () {
    $query = "DELETE FROM tags
    WHERE articleref = ?";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->ref);
    $stmt->execute();
    $stmt->close();
  }
}

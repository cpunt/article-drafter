<?php
namespace model;

class ArticlesOutputModel extends \db\Database {

  public function __construct() {
    parent::__construct();
  }

  public function getArticlesOutput($result, $username) {
    if($result->num_rows > 0) {

      while($row = $result->fetch_assoc()) {
        if($row['idarticles']) {
          unset($row['idarticles']);
        }
        $row['editable'] = $username == $row['username'] ? true : false;
        $row['tags'] = $this->getTags($row['articleref']);
        $rows[] = $row;
      }

      return $rows;
    } else {
      return [];
    }
  }

  private function getTags($articleRef) {
    $query = "SELECT tag FROM tags
    WHERE articleref = ?";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $articleRef);
    $stmt->execute();
    $stmt->bind_result($tag);

    while($stmt->fetch()) {
      $tags[] = $tag;
    }

    $stmt->close();

    return $tags;
  }
}

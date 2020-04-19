<?php
namespace model;

class OutputModel extends \db\Database {

  public function __construct() {
    parent::__construct();
  }

  public function output($result, $username) {
    if($result->num_rows > 0) {

      while($row = $result->fetch_assoc()) {
        if($row['idarticles']) {
          unset($row['idarticles']);
        }
        $tags = $this->getTags($row['articleref']);
        $row['editable'] = $username == $row['username'] ? true : false;
        $row['tags'] =  $tags ? $tags : [];
        $rows[] = $row;
      }

      return $rows;
    } else {
      return [];
    }
  }

  private function getTags($ref) {
    $query = "SELECT tag FROM tags
    WHERE articleref = ?";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $ref);
    $stmt->execute();
    $stmt->bind_result($tag);

    while($stmt->fetch()) {
      $tags[] = $tag;
    }

    $stmt->close();

    return $tags;
  }
}

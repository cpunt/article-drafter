<?php
namespace model;

class GetArticleModel extends \db\Database {
  private $username,
          $ref;

  public function __construct($username, $ref) {
    parent::__construct();
    $this->username = $username;
    $this->ref = $ref;
  }

  public function get () {
    $query = "SELECT articles.articleref, articles.title, articles.text, articles.tags, userbase.username, articles.draft, articles.created, articles.lastSaved
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE articleref = ?";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->ref);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $row['editable'] = $this->username == $row['username'];
      // Migration code
      $row['tags'] = $row['tags'] ? json_decode($row['tags']) : [];

      return $row;
    }

    return [];
  }
}

// public function output($result, $username) {
//   if($result->num_rows > 0) {
//
//     while($row = $result->fetch_assoc()) {
//       if($row['idarticles']) {
//         unset($row['idarticles']);
//       }
//       $tags = $this->getTags($row['articleref']);
//       $row['editable'] = $username == $row['username'] ? true : false;
//       $row['tags'] =  $tags ? $tags : [];
//       $rows[] = $row;
//     }
//
//     return $rows;
//   } else {
//     return [];
//   }
// }

<?php
namespace model;

class DraftModel extends \db\Database {
  private $username;

  public function __construct ($username) {
    parent::__construct();
    $this->username = $username;
  }

  public function getArticles ($offset) {
    $query = "SELECT articles.articleref, articles.title, LEFT(articles.text, 500) AS text, articles.tags, userbase.username, articles.created
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE userbase.username = ?
    AND articles.draft = 1
    ORDER BY articles.idarticles DESC
    LIMIT 5 OFFSET $offset";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->username);;
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $row['editable'] = $this->username == $row['username'];
        $row['tags'] = $row['tags'] ? json_decode($row['tags']) : [];
        $rows[] = $row;
      }

      return $rows;
    }

    return [];
  }

  public function getLastPage () {
    $query = "SELECT COUNT(articleref) FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE userbase.username = ?
    AND articles.draft = 1";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->username);
    $stmt->execute();
    $stmt->bind_result($rows);
    $stmt->fetch();
    $stmt->close();

    if($rows == 0) {
      $rows = 1;
    }

    return ceil($rows / 5);
  }
}

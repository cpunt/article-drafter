<?php
namespace model;

class DraftModel extends \db\Database {
  private $user;

  public function __construct($user) {
    parent::__construct();
    $this->user = $user;
  }

  public function getItems($offset) {
    $query = "SELECT articles.articleref, articles.title, LEFT(articles.text, 500) AS text, userbase.username, articles.created
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE userbase.username = ?
    AND articles.draft = 1
    ORDER BY articles.idarticles DESC
    LIMIT 5 OFFSET $offset";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->user);;
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    return $result;
  }

  public function getLastPage() {
    $query = "SELECT COUNT(articleref) FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE userbase.username = ?
    AND articles.draft = 1";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->user);
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

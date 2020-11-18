<?php
namespace model;

class ArticleModel extends \db\Database {
  private $articleRef;

  public function __construct($articleRef) {
    parent::__construct();
    $this->articleRef = $articleRef;
  }

  public function getArticle() {
    $query = "SELECT articles.articleref, articles.title, articles.text, userbase.username, articles.created
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE articleref = ?";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->articleRef);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    return $result;
  }
}

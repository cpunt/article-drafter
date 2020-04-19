<?php
namespace model;

class HomeModel extends \db\Database {
  private $tags;

  public function __construct($tags) {
    parent::__construct();
    $this->tags = $tags;
  }

  public function getItems($offset) {
    $query = "SELECT articles.articleref, articles.title, LEFT(articles.text, 500) AS text, userbase.username, articles.created
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE articles.draft = 0
    ORDER BY articles.idarticles DESC
    LIMIT 5 OFFSET $offset";

    $stmt = ($this->conn)->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    return $result;
  }

  public function getTagsItems($offset) {
    $qm = rtrim(str_repeat('?, ', count($this->tags)), ', ');
    $params = array_merge([str_repeat('s', count($this->tags))], $this->tags);
    $query = "SELECT DISTINCT articles.idarticles, articles.articleref, articles.title, articles.text, userbase.username, articles.created  FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    LEFT JOIN tags ON articles.articleref = tags.articleref
    WHERE tags.tag IN ($qm)
    AND articles.draft = 0
    ORDER BY articles.idarticles DESC
    LIMIT 5 OFFSET $offset";

    $stmt = ($this->conn)->prepare($query);
    call_user_func_array(array($stmt, 'bind_param'), $params);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    return $result;
  }

  public function getLastPage() {
    $query = "SELECT COUNT(articleref) FROM articles
    WHERE articles.draft = 0";

    $stmt = ($this->conn)->prepare($query);
    $stmt->execute();
    $stmt->bind_result($rows);
    $stmt->fetch();
    $stmt->close();

    if($rows == 0) {
      $rows = 1;
    }

    return ceil($rows / 5);
  }

  public function getTagsLastPage() {
    $qm = rtrim(str_repeat('?, ', count($this->tags)), ', ');
    $params = array_merge([str_repeat('s', count($this->tags))], $this->tags);
    $query = "SELECT DISTINCT COUNT(articles.articleref)
    FROM articles
    LEFT JOIN tags ON articles.articleref = tags.articleref
    WHERE tags.tag IN ($qm)
    AND articles.draft = 0";

    $stmt = ($this->conn)->prepare($query);
    call_user_func_array(array($stmt, 'bind_param'), $params);
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

<?php
namespace model;

class ProfileModel extends \db\Database {
  private $userProfile,
          $tags;

  public function __construct($userProfile, $tags) {
    parent::__construct();
    $this->userProfile = $userProfile;
    $this->tags = $tags;
  }

  public function getTagsItems($offset) {
    $qm = rtrim(str_repeat('?, ', count($this->tags)), ', ');
    $params = array_merge([str_repeat('s', count($this->tags) + 1)], $this->tags, [$this->userProfile]);
    $query = "SELECT DISTINCT articles.idarticles, articles.articleref, articles.title, LEFT(articles.text, 500) AS text, userbase.username, articles.created
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    LEFT JOIN tags ON articles.articleref = tags.articleref
    WHERE tags.tag IN ($qm)
    AND userbase.username = ?
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

  public function getItems($offset) {
    $query = "SELECT articles.articleref, articles.title, LEFT(articles.text, 500) AS text, userbase.username, articles.created
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE userbase.username = ?
    AND articles.draft = 0
    ORDER BY articles.idarticles DESC
    LIMIT 5 OFFSET $offset";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->userProfile);;
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    return $result;
  }

  public function getTagsLastPage() {
    $qm = rtrim(str_repeat('?, ', count($this->tags)), ', ');
    $params = array_merge([str_repeat('s', count($this->tags) + 1)], $this->tags, [$this->userProfile]);
    $query = "SELECT DISTINCT COUNT(articles.articleref)
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    LEFT JOIN tags ON articles.articleref = tags.articleref
    WHERE tags.tag IN ($qm)
    AND username = ?
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

  public function getLastPage() {
    $query = "SELECT COUNT(articleref) FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE userbase.username = ?
    AND articles.draft = 0";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->userProfile);
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

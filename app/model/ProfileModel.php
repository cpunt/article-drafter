<?php
namespace model;

class ProfileModel extends \db\Database {
  private $username,
          $profile,
          $tags;

  public function __construct ($username, $profile, $tags) {
    parent::__construct();
    $this->username = $username;
    $this->profile = $profile;
    $this->tags = $tags;
  }

  public function getArticles ($offset) {
    $query = "SELECT articles.articleref, articles.title, LEFT(articles.text, 500) AS text, articles.tags, userbase.username, articles.created
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE userbase.username = ?
    AND articles.draft = 0
    ORDER BY articles.idarticles DESC
    LIMIT 5 OFFSET $offset";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->profile);;
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
    AND articles.draft = 0";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->profile);
    $stmt->execute();
    $stmt->bind_result($rows);
    $stmt->fetch();
    $stmt->close();

    if($rows == 0) {
      $rows = 1;
    }

    return ceil($rows / 5);
  }
  /*
  public function getTagsArticles ($offset) {
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

  public function getTagsLastPage () {
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
  */
}

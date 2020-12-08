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

    return $this->getResultOutput($result);
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

    $rows = $rows == 0 ? 1 : $rows;
    return ceil($rows / 5);
  }

  public function getTagsLastPage () {
    $queryOrStatements = rtrim(str_repeat('OR JSON_CONTAINS(tags, ?) ', count($this->tags) - 1));
    $types = str_repeat('s', count($this->tags) + 1);
    $params = $this->encodeTags();
    array_push($params, $this->profile);

    $query = "SELECT COUNT(*) FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE JSON_CONTAINS(tags, ?)$queryOrStatements
    AND draft = 0
    AND username = ?;";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $stmt->bind_result($rows);
    $stmt->fetch();
    $stmt->close();

    $rows = $rows == 0 ? 1 : $rows;
    return ceil($rows / 5);
  }

  public function getTagsArticles ($offset) {
    $queryOrStatements = rtrim(str_repeat('OR JSON_CONTAINS(tags, ?) ', count($this->tags) - 1));
    $types = str_repeat('s', count($this->tags) + 1);
    $params = $this->encodeTags();
    array_push($params, $this->profile);

    $query = "SELECT articles.articleref, articles.title, LEFT(articles.text, 500) AS text, articles.tags, userbase.username, articles.created
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE JSON_CONTAINS(tags, ?)$queryOrStatements
    AND draft = 0
    AND username = ?
    ORDER BY idarticles DESC
    LIMIT 5 OFFSET $offset;";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    return $this->getResultOutput($result);
  }

  public function getResultOutput ($result) {
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

  public function encodeTags () {
    $params = [];

    foreach ($this->tags as $tag) {
      array_push($params, json_encode($tag));
    }

    return $params;
  }
}

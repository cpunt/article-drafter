<?php
namespace model;

class LoadItemModel extends \db\Database {
  private $ref;

  public function __construct($ref) {
    parent::__construct();
    $this->ref = $ref;
  }

  public function getItem() {
    $query = "SELECT articles.articleref, articles.title, articles.text, userbase.username, articles.draft, articles.created
    FROM articles
    LEFT JOIN userbase ON articles.iduser = userbase.iduser
    WHERE articleref = ?";

    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->ref);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    return $result;
  }
}

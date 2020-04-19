<?php
namespace model;

class UserModel extends \db\Database {

  public function __construct() {
    parent::__construct();
    session_start();
  }

  public function userLoggedIn() {
    if(isset($_SESSION['user'])) {
      return $_SESSION['user'];
    } else {
      return false;
    }
  }

  public function username() {
    if(isset($_SESSION['user'])) {
      $query = "SELECT username FROM userbase
      WHERE iduser = ?";
      $stmt = ($this->conn)->prepare($query);
      $stmt->bind_param('s', $_SESSION['user']);
      $stmt->execute();
      $stmt->bind_result($username);
      $stmt->fetch();
      $stmt->close();

      if($username) {
        return $username;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  public function logout() {
    session_unset();
    session_destroy();
  }

  public function validUser($username) {
    $query = "SELECT username FROM userbase
    WHERE username = ?";
    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();
    $rows = $stmt->num_rows;
    $stmt->close();

    if($rows == 1) {
      return true;
    } else {
      return false;
    }
  }
}

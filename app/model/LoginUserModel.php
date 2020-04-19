<?php
namespace model;

class LoginUserModel extends \db\Database {
  private $username,
          $password,
          $iduser=null;

  public function __construct($username, $password) {
    parent::__construct();
    $this->username = $username;
    $this->password = $password;
  }

  public function validateUser() {
    $query = "SELECT iduser, password FROM userbase
    WHERE username = ?";
    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->username);
    $stmt->execute();
    $stmt->bind_result($iduser, $hash);
    $stmt->fetch();
    $stmt->close();

    if($hash) {
      $this->iduser = $iduser;
      return password_verify($this->password, $hash);
    } else {
      return false;
    }
  }

  public function loginUser() {
    if($this->iduser) {
      session_start();
      if(!$_SESSION['user']) {
        $_SESSION['user'] = $this->iduser;
        return true;
      }
    }
    
    return false;
  }

}

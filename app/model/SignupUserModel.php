<?php
namespace model;

class SignupUserModel extends \db\Database {
  private $username,
          $password,
          $conPassword,
          $errors = [
            'username' => false,
            'password' => false,
            'conPassword' => false,
            'valid' => true
          ];

  public function __construct($username, $password, $conPassword) {
    parent::__construct();
    $this->username = trim($username);
    $this->password = $password;
    $this->conPassword = $conPassword;
  }

  public function signupUser() {
    date_default_timezone_set('Europe/London');
    $date = new \DateTime();
    $iduser = 'id' . uniqid() . 'ts' . $date->getTimestamp();
    $hash = password_hash($this->password, PASSWORD_DEFAULT);
    $created = date('d/m/y');

    $query = "INSERT INTO userbase(iduser, username, password, created)
    VALUES(?,?,?,?)";
    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('ssss', $iduser, $this->username, $hash, $created);
    $execution = $stmt->execute();
    $stmt->close();

    $res['valid'] = $execution;
    return $res;
  }

  public function validateSignup() {
    $userLen = strlen($this->username);
    $passwordLen = strlen($this->password);
    $containsUCLetter = preg_match('/[A-Z]/', $this->password);
    $cotainsLCLetter = preg_match('/[a-z]/', $this->password);
    $containsDigit = preg_match('/\d/', $this->password);

    if($userLen < 3 || $userLen > 12 || !ctype_alnum($this->username)) {
      ($this->errors)['username'] = 'Username must be between 3 & 12 chars and alphanum.';
    }

    if($this->usernameTaken()) {
      ($this->errors)['username'] = 'Username taken';
    }

    if($passwordLen < 8 || $passwordLen > 50 || !$containsUCLetter || !$cotainsLCLetter || !$containsDigit) {
      ($this->errors)['password'] = 'Must contain at least 8 characters, 1 number, 1 lower and upper case letter.';
    }

    if($this->conPassword != $this->password) {
      ($this->errors)['conPassword'] = 'Passwords do not match.';
    }

    foreach($this->errors as $key => $value) {
      if($value && $key != 'valid') {
        ($this->errors)['valid'] = false;
        break;
      }
    }

    return ($this->errors)['valid'];
  }

  public function getErrors() {
    return $this->errors;
  }

  private function usernameTaken() {
    $query = "SELECT username FROM userbase
    WHERE username = ?";
    $stmt = ($this->conn)->prepare($query);
    $stmt->bind_param('s', $this->username);
    $stmt->execute();
    $stmt->store_result();
    $rows = $stmt->num_rows;
    $stmt->close();

    if($rows > 0) {
      return true;
    } else {
      return false;
    }
  }

}

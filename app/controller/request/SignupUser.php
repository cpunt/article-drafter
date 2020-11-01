<?php
namespace controller\request;

class SignupUser {

  public function __construct($requestValue) {
    $userModel = new \model\UserModel();

    if(!$userModel->userLoggedIn()) {
      $newUser = (array) json_decode($requestValue);
      $username = $newUser['username'];
      $password = $newUser['password'];
      $conPassword = $newUser['conPassword'];

      $signupUserModel = new \model\SignupUserModel($username, $password, $conPassword);

      if(!$signupUserModel->validateSignup()) {
        $res = $signupUserModel->getErrors();
      } else {
        $res = $signupUserModel->signupUser();
        if($res['valid']) {
          $loginUserModel = new \model\LoginUserModel($username, $password);
          $loginUserModel->validateUser();
          $loginUserModel->loginUser();
        }
      }

      $jsonEncodeView = new \view\JSONEncodeView();
      $jsonEncodeView->outputRes($res);
    }
  }

}

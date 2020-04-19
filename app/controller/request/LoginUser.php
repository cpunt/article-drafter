<?php
namespace controller\request;

class LoginUser {

  public function __construct($requestValue) {
    $userModel = new \model\UserModel();

    if(!$userModel->userLoggedIn()) {
      $user = (array) json_decode($requestValue);
      $username = $user['username'];
      $password = $user['password'];

      $loginUserModel = new \model\LoginUserModel($username, $password);

      if(!$loginUserModel->validateUser()) {
        $res['valid'] = false;
      } else {
        $res['valid'] = $loginUserModel->loginUser();
      }

      $jsonEncodeView = new \view\JSONEncodeView();
      $jsonEncodeView->outputRes($res);
    }
  }

}

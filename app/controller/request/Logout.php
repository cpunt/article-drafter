<?php
namespace controller\request;

class Logout {

  public function __construct() {
    $userModel = new \model\UserModel();

    if($userModel->userLoggedIn()) {
      $userModel->logout();
      $res['logout'] = true;

      $jsonEncodeView = new \view\JSONEncodeView();
      $jsonEncodeView->outputRes($res);
    }
  }

}

<?php
namespace controller\url;

class Signup {

  public function __construct($twig) {
    $userModel = new \model\UserModel();
    $displayView = new \view\DisplayView($twig, $userModel->username());

    if(!$userModel->userLoggedIn()) {
      $displayView->view('signup');
    } else {
      $displayView->view('home');
    }
  }

}

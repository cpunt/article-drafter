<?php
namespace controller\url;

class Login {

  public function __construct($twig) {
    $userModel = new \model\UserModel();
    $displayView = new \view\DisplayView($twig, $userModel->username());

    if(!$userModel->userLoggedIn()) {
      $displayView->view('login');
    } else {
      $displayView->view('home');
    }
  }
}

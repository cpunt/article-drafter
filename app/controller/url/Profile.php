<?php
namespace controller\url;

class Profile {

  public function __construct($twig) {
    $userModel = new \model\UserModel();
    $displayView = new \view\DisplayView($twig, $userModel->username());

    $displayView->view('profile');
  }

}

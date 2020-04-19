<?php
namespace controller\url;

class Drafts {

  public function __construct($twig) {
    $userModel = new \model\UserModel();
    $displayView = new \view\DisplayView($twig, $userModel->username());

    // If url username is equal to user display drafts else direct to home
    if($userModel->userLoggedIn()) {
      $displayView->view('drafts');
    } else {
      $displayView->view('home');
    }
  }

}

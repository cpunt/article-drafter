<?php
namespace controller\url;

class CreateArticle {

  public function __construct($twig) {
    $userModel = new \model\UserModel();
    $displayView = new \view\DisplayView($twig, $userModel->username());

    if($userModel->userLoggedIn()) {
      $displayView->view('createArticle');
    } else {
      $displayView->view('home');
    }
  }

}

<?php
namespace controller\url;

class EditArticle {

  public function __construct($twig) {
    $userModel = new \model\UserModel();
    $displayView = new \view\DisplayView($twig, $userModel->username());

    $displayView->view('editarticle');
  }

}

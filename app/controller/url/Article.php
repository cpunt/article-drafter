<?php
namespace controller\url;

class Article {

  public function __construct($twig) {
    $userModel = new \model\UserModel();
    $displayView = new \view\DisplayView($twig, $userModel->username());

    // TODO check article is not draft
    $displayView->view('article');
  }

}

<?php
namespace controller\request;

class Create {
  public function __construct($requestValue) {
    $userModel = new \model\UserModel();

    if($userModel->userLoggedIn()) {
      $articleData = (array) json_decode($requestValue);
      $title = trim($articleData['title']);
      $text = $articleData['text'];
      $tags = (array) $articleData['tags'];
      $draft = $articleData['draft'];
      $iduser = $userModel->userLoggedIn();
      $createArticleModel = new \model\CreateArticleModel($title, $text, $tags, $draft, $iduser);

      if($draft || $createArticleModel->isArticleCreationValid()) {
        $res['created'] = $createArticleModel->createArticle();
        $res['draft'] = $draft;
      } else {
        $res['created'] = false;
        $res['article'] = [
          'title' => $title,
          'text' => $text,
          'tags' => $tags
        ];
      }

      $jsonEncodeView = new \view\JSONEncodeView();
      $jsonEncodeView->outputRes($res);
    }
  }
}

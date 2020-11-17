<?php
namespace controller\request;

class Create {
  public function __construct($requestStr) {
    $userModel = new \model\UserModel();
    $iduser = $userModel->userLoggedIn();

    // TODO is this check necessary (Probably get rid of valid response and check on iduser)
    if($iduser) {
      $response['valid'] = true;
      $request = (array) json_decode($requestStr);
      $createModel = new \model\CreateModel($iduser, $request['title'], $request['text'], $request['tags']);
      $response['created'] = $createModel->createDraft();
    } else {
      $response['valid'] = false;
    }

    $jsonEncodeView = new \view\JSONEncodeView();
    $jsonEncodeView->outputRes($response);
  }
}


// public function __construct($requestValue) {
//   $userModel = new \model\UserModel();
//   // TODO is this check necessary
//   if($userModel->userLoggedIn()) {
//     $articleData = (array) json_decode($requestValue);
//     $title = trim($articleData['title']);
//     $text = $articleData['text'];
//     $tags = (array) $articleData['tags'];
//     $draft = $articleData['draft'];
//     $iduser = $userModel->userLoggedIn();
//     $createArticleModel = new \model\CreateArticleModel($title, $text, $tags, $draft, $iduser);
//
//     if($draft || $createArticleModel->isArticleCreationValid()) {
//       $res['created'] = $createArticleModel->createArticle();
//       $res['draft'] = $draft;
//     } else {
//       $res['created'] = false;
//       $res['article'] = [
//         'title' => $title,
//         'text' => $text,
//         'tags' => $tags
//       ];
//     }
//
//     $jsonEncodeView = new \view\JSONEncodeView();
//     $jsonEncodeView->outputRes($res);
//   }
// }

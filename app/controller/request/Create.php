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

<?php
namespace controller\request;

class Load {
  public function __construct($requestStr) {
    $request = (array) json_decode($requestStr);
    $type = $request['type'];
    $ref = $request['ref'];

    $userModel = new \model\UserModel();
    $response['valid'] = true;

    // TODO sort out this
    // if ($type == 'view') {
    //   // Validate article type isn't draft
    //   if (condition here) $response['valid'] = false;
    // } else if ($type == 'edit') {
    //   //   $editModel = new \model\EditModel($userModel->userLoggedIn(), $ref);
    //   //   if(!$iduser || !$editModel->validateEdit()) $response['valid'] = false;
    // }

    if($response['valid']) {
      $loadItemModel = new \model\GetArticleModel($userModel->username(), $ref);
      $response['article'] = $loadItemModel->get();
    }

    $jsonEncodeView = new \view\JSONEncodeView();
    $jsonEncodeView->outputRes($response);
  }
}

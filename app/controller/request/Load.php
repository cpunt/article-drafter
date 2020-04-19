<?php
namespace controller\request;

class Load {
  public function __construct($requestStr) {
    $request = (array) json_decode($requestStr);
    $type = $request['type'];
    $ref = $request['ref'];

    $userModel = new \model\UserModel();
    $response['valid'] = true;

    if($type == 'edit') {
      $iduser = $userModel->userLoggedIn();
      $editModel = new \model\EditModel($iduser, $ref);

      if(!$iduser || !$editModel->validateEdit()) {
        $response['valid'] = false;
      }
    }

    if($response['valid']) {
      $loadItemModel = new \model\LoadItemModel($ref);
      $item = $loadItemModel->getItem();

      $outputModel = new \model\OutputModel();
      $response['item'] = $outputModel->output($item, $userModel->username())[0];
      $response['draft'] = $response['item']['draft'];
      unset($response['item']['draft']);

      if($type == 'view' && $response['draft']) {
        $response['valid'] = false;
        unset($response['item']);
      }
    }

    $jsonEncodeView = new \view\JSONEncodeView();
    $jsonEncodeView->outputRes($response);
  }
}

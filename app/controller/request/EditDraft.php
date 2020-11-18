<?php
namespace controller\request;

class EditDraft {
  public function __construct($requestStr) {
    $userModel = new \model\UserModel();
    $iduser = $userModel->userLoggedIn();
    $request = (array) json_decode($requestStr);
    $editDraftModel = new \model\EditDraftModel($iduser, $request['ref']);

    // TODO Validate user and edit on load of page so don't have to do it here?
    if (!$iduser || !$editDraftModel->validateEdit()) {
      $response['valid'] = false;
    } else {
      $response['valid'] = true;

      switch ($request['type']) {
        case 'save':
          $response['lastSaved'] = $editDraftModel->save($request['title'], $request['text'], $request['tags'], $timeSaved);
          break;
        case 'delete':
          $response['deleted'] = $editDraftModel->delete();
          break;
      }
    }

    $jsonEncodeView = new \view\JSONEncodeView();
    $jsonEncodeView->outputRes($response);
  }
}

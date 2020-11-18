<?php
namespace controller\request;

class EditArticle {
  public function __construct($requestStr) {
    $userModel = new \model\UserModel();
    $iduser = $userModel->userLoggedIn();
    $request = (array) json_decode($requestStr);
    $editArticleModel = new \model\EditArticleModel($iduser, $request['ref']);

    // TODO Validate user and edit on load of page so don't have to do it here?
    if (!$iduser || !$editArticleModel->validateEdit()) {
      $response['valid'] = false;
    } else {
      $response['valid'] = true;

      switch ($request['type']) {
        case 'save':
          $response['lastSaved'] = $editArticleModel->save($request['title'], $request['text'], $request['tags']);

          if ($request['create']) {
            $response['created'] = $response['lastSaved'] ? $editArticleModel->create() : false;
          }
          break;
        case 'delete':
          $response['deleted'] = $editArticleModel->delete();
          break;
      }
    }

    $jsonEncodeView = new \view\JSONEncodeView();
    $jsonEncodeView->outputRes($response);
  }
}

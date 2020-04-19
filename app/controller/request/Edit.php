<?php
namespace controller\request;

class Edit {

  public function __construct($requestStr) {
    $userModel = new \model\UserModel();
    $iduser = $userModel->userLoggedIn();

    $request = (array) json_decode($requestStr);
    $ref = $request['ref'];
    $editModel = new \model\EditModel($iduser, $ref);

    if($iduser && $editModel->validateEdit()) {
      $response['valid'] = true;

      if($request['type'] == 'updateDraft' || $request['type'] == 'updateArticle') {
        $title = trim($request['title']);
        $text = trim($request['text']);
        $tags = $request['tags'];
        $response['updated'] = false;

        if($request['type'] == 'updateDraft') {
          $response['type'] = 'draft';

          if($editModel->validateDraftUpdate($title, $text, $tags)) {
            $response['updated'] = $editModel->updateDraft(false, $title, $text, $tags);
          }
        }

        if($request['type'] == 'updateArticle') {
          $response['type'] = 'article';

          if($editModel->validateArticleUpdate($text, $tags)) {
            if($request['draft']) {
              if($editModel->validateArticleTitle($title)) {
                $response['updated'] = $editModel->updateDraft(true, $title, $text, $tags);
              }
            } else {
              $response['updated'] = $editModel->updateArticle($text, $tags);
            }
          }
        }

        if(!$response['updated']) {
          $response['title'] = $title;
          $response['text'] = $text;
          $response['tags'] = $tags;
        }
      }

      if($request['type'] == 'delete') {
        $response['deleted'] = $editModel->delete();
      }
    } else {
      $response['valid'] = false;
    }

    $jsonEncodeView = new \view\JSONEncodeView();
    $jsonEncodeView->outputRes($response);
  }

}

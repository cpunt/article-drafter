<?php
namespace controller\request;

class LoadPage {
  public function __construct($requestStr) {
    $userModel = new \model\UserModel();
    $request = (array) json_decode($requestStr);
    $pageModel = $this->getPageModel($request, $userModel->username());

    $pageNum = (int) $request['pageNum'] <= 0 ? 1 : $request['pageNum'];
    $response['valid'] = true;

    // Validates if profile exists if page profile or if user is signed in if page drafts
    if (($request['page'] == 'profile' && !$userModel->validUser($request['user'])) ||
    ($request['page'] == 'drafts' && !$userModel->username())) {
      $response['valid'] = false;
      $lastPage = 1;
      $pageNum = 1;
    }

    if ($response['valid']) {
      $searchTags = count($request['tags']) > 0 && count($request['tags']) <= 10;
      $lastPage = $searchTags ? $pageModel->getTagsLastPage() : $pageModel->getLastPage();
      $pageNum = min($pageNum, $lastPage);
      $offset = ($pageNum * 5) - 5;

      $articles = $searchTags ? $pageModel->getTagsArticles($offset) : $pageModel->getArticles($offset);
      $response['articles'] = $articles;
    }

    $response['pagination']['lastPage'] = $lastPage;
    $response['pagination']['page'] = $pageNum;

    $jsonEncodeView = new \view\JSONEncodeView();
    $jsonEncodeView->outputRes($response);
  }

  private function getPageModel($request, $loggedInUser) {
    switch($request['page']) {
      case 'drafts':
        return new \model\DraftModel($loggedInUser);
      case 'home':
        return new \model\HomeModel($loggedInUser, $request['tags']);
      case 'profile':
        $user = $request['user'];
        return new \model\ProfileModel($loggedInUser, $request['user'], $request['tags']);
    }
  }
}

<?php
namespace controller\request;

class LoadPage {
  private $pageModel;

  public function __construct($requestStr) {
    $request = (array) json_decode($requestStr);
    $page = $request['page'];
    $user = $request['user'];
    $pageNum = (int) $request['pageNum'];
    $tags = $request['tags'];
    $userModel = new \model\UserModel();

    if ($page == 'drafts') {
      $user = $userModel->username();
    }

    $this->pageModel = $this->getPageModel($page, $user, $tags);

    if($page == 'profile' && !$userModel->validUser($user)) {
      // If user trying to view user profile who doesn't exist
      $response['validRequest'] = false;
    } else {
      $response['validRequest'] = true;
    }

    if($response['validRequest']) {
      $lastPage = $this->getLastPage($tags);
      $pageNum = $this->getPageNumber($pageNum, $lastPage);
      $offset = ($pageNum * 5) - 5;
      $items = $this->getItems($tags, $offset);

      $outputModel = new \model\OutputModel();
      $response['items'] = $outputModel->output($items, $userModel->username());
    } else {
      $lastPage = 1;
      $pageNum = 1;
    }

    $response['pagination'] = [
      'lastPage' => $lastPage,
      'page' => $pageNum
    ];

    $jsonEncodeView = new \view\JSONEncodeView();
    $jsonEncodeView->outputRes($response);
  }

  private function getPageModel($page, $user, $tags) {
    switch($page) {
      case 'drafts':
        return new \model\DraftModel($user);
      case 'home':
        return new \model\HomeModel($tags);
      case 'profile':
        return new \model\ProfileModel($user, $tags);
    }
  }

  private function getPageNumber($pageNum, $lastPage) {
    if($pageNum <= 0 || $pageNum > $lastPage) {
      $pageNum = 1;
    }

    return $pageNum;
  }

  private function getLastPage($tags) {
    if(count($tags) == 0 || count($tags) > 10) {
      $lastPage = $this->pageModel->getLastPage();
    } else {
      $lastPage = $this->pageModel->getTagsLastPage();
    }

    return $lastPage;
  }

  private function getItems($tags, $offset) {
    if(count($tags) == 0 || count($tags) > 10) {
      $items = $this->pageModel->getItems($offset);
    } else {
      $items = $this->pageModel->getTagsItems($offset);
    }

    return $items;
  }
}

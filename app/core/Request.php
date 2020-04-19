<?php
namespace core;

class Request {
  public function __construct() {
    $requestData = $this->getRequest();

    $path = 'app/controller/request/' . $requestData['key'] . '.php';

    if(file_exists($path)) {
      $className = "\controller\\request\\" . $requestData['key'];
      $class = new $className($requestData['value']);
    }
  }

  private function getRequest() {
    switch($_SERVER['REQUEST_METHOD']) {
      case 'GET':
        $verb = $_GET;
        break;
      case 'POST':
        $verb = $_POST;
        break;
      case 'DELETE':
      case 'PATCH':
        $verb = [];
        parse_str(file_get_contents("php://input"), $verb);
        break;
    }

    if(count($verb) == 1) {
      $data = [
        'verb' => $_SERVER['REQUEST_METHOD'],
        'key' => key($verb),
        'value' => $verb[key($verb)]
      ];

      return $data;
    }
  }

}

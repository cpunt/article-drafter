<?php
namespace core;

class Router {
  private $route = 'home';

  public function __construct($twig) {
    $url = $this->parseUrl();
    $path = 'app/controller/url/' . $url[0] . '.php';

    if(file_exists($path)) {
      $this->route = $url[0];
      unset($url[0]);
    }

    $arguments = array_values($url);

    $className = "\controller\url\\$this->route";
    $this->route = new $className($twig, ...$arguments);
  }

  private function parseUrl() {
    if(isset($_GET['url'])) {
      return explode('/', filter_var(rtrim($_GET['url'], '/'), FILTER_SANITIZE_URL));
    }
  }
}

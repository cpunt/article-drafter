<?php
require_once 'app/autoloader.php';
require_once 'vendor/autoload.php';

if(isset($_SERVER['REQUEST_METHOD'])) {
  $loader = new Twig_Loader_Filesystem('app/view/templates');
  $twig = new Twig_Environment($loader);
  if((isset($_GET['url']))||($_SERVER['REQUEST_METHOD'] == 'GET' && count($_GET) == 0)) {
    try {
      $app = new core\Router($twig);
    }
    catch(\Error $e) {
      echo $e->getMessage();
    }
  } else {
    try {
      $request = new core\Request();
    }
    catch(\Error $e) {
      echo $e->getMessage();
    }
  }
}

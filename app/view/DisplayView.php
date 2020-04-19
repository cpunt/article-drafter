<?php
namespace view;

class DisplayView {
  private $twig,
          $username;

  public function __construct($twig, $username) {
    $this->twig = $twig;
    $this->username = $username;
  }

  public function view($template) {
    echo ($this->twig)->render($template . '.tpl', [
      'username' => $this->username
    ]);
  }
}

<?php
class Login extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model('user_model');
    $this->output->set_header('Content-type:application/json;');
  }

  public function login_user()
  {
    $jsonObj = $this->decode();
    $username = $jsonObj->username;
    $password = $jsonObj->password;
    $hasil = $this->user_model->getUser($username, md5($password));
    if (sizeof($hasil) == 0)
    {
      echo json_encode(array('error'=>'salah ajag!'));
    }
    else
    {
      echo json_encode($hasil);
      $this->session->set_userdata('username', $username);
      $this->session->set_userdata('logged_in', 'login');
    }
  }

  public function decode()
  {
    $data = file_get_contents('php://input');
    $jsonObj = json_decode($data);

    return $jsonObj;
  }
}

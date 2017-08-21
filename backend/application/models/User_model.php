<?php
class User_model extends CI_Model
{
  public function __construct()
  {
    parent::__construct();
  }

  public function getUser($username, $password)
  {
    $data = array('username'=>$username, 'password'=>$password);
    $this->db->select('*');
    $this->db->from('users');
    $this->db->where($data);
    $query = $this->db->get();

    return $query->result_array();
  }

  public function tambah_user($username, $password)
  {
    $data = array(
      'username'=>$username, 
      'password'=> md5($password)
      );
    return $this->db->insert('users', $data);
  }

  public function update_user($id, $username, $password)
  {
    if ($password != null || $password != '')
    {
      $data = array(
        'username'=>$username,
        'password'=>$password
        );
    }
    elseif ($password == null || $password == '')
    {
      $data = array(
        'username'=>$username
        );
    }

    $this->db->where('id_user', $id);
    return $this->db->update('users', $data);
  }

  public function hapus_user($id)
  {
    $this->db->where('id_user', $id);
    return $this->db->delete('users');
  }

  public function ambil_user()
  {
    return $this->db->get('users')->result_array();
  }
}

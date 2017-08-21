<?php
class User extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('User_model');
		$this->output->set_header('Content-type:application/json');
	}

	public function session_check()
	{
		if (isset($this->session->logged_in))
		{
			$data = array('logged_in'=>$this->session->logged_in, 'username'=>$this->session->username);
		}
		else
		{
			$data = array('logged_in'=>'so ta login ka blum eh?', 'username'=>'mana punya :p');
		}

		echo json_encode($data);
	}

	public function daftar_user()
	{
		if (isset($this->session->logged_in))
		{
			$hasil = $this->User_model->ambil_user();
		}
		else
		{
			$hasil = array(array('biji'=>'konga'), array('login_status'=>'pi login dulu :p'));
		}
		echo json_encode($hasil);
	}


	public function tambah_user()
	{
		if (!isset($this->session->logged_in))
		{
			echo json_encode(array('status_report'=>'pi login dulu coy :p'));
		}
		else
		{
			$data = $this->decode();
			$arr = array();
			$proses = $this->User_model->tambah_user($data->username, $data->password);
			$arr['data'] = $proses;
			echo json_encode($arr);
		}
	}

	public function update_user()
	{
		if (!isset($this->session->logged_in))
		{
			echo json_encode(array('status_report'=>'pi login dulu coy :p'));
		}
		else
		{
			$data = $this->decode();
			$id_user = $data->id_user;
			$username = $data->username;
			$password = $data->password;
			$arr = $this->User_model->update_user($id_user, $username, $password);
			echo json_encode($arr);
		}
	}

	public function delete_user()
	{
		if (!isset($this->session->logged_in))
		{
			echo json_encode(array('status_report'=>'pi login dulu coy :p'));
		}
		else
		{
			$arr = array();
			$data = $this->decode();
			$arr['status'] =$this->User_model->hapus_user($data->id);
			echo json_encode($arr);
		}
	}

	public function decode()
	{
		if (!isset($this->session->logged_in))
		{
			echo json_encode(array('status_report'=>'pi login dulu coy :p'));
		}
		else
		{
			$data = file_get_contents('php://input');
			$Obj = json_decode($data);

		}
		return $Obj;
	}

	public function logout()
	{
		$this->session->sess_destroy();
	}
}
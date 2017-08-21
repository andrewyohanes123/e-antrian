<?php

class Antrian extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->output->set_header('Content-type: application/json;charset="utf-8');
    $this->load->model('Antrian_model');
  }

  public function ambil_antrian()
  {
    // if (!isset($this->session->logged_in))
    // {
    //   echo json_encode(array('status_report'=>'pi login dulu coy :p'));
    // }
    // else
    // {
      $request = $this->decode();
      $tempat = $request->tempat;
      $nomor = $request->nomor;
      $data = array('tempat'=>$tempat, 'nomor'=>$nomor);
      $this->load->model('antrian_model');
      $data = $this->antrian_model->ambil_nomor($tempat, $nomor);
      echo json_encode($data);
    // }
  }

  public function daftar_antrian($tempat)
  {
    if (!isset($this->session->logged_in))
    {
      echo json_encode(array('status_report'=>'pi login dulu coy :p'));
    }
    else
    {
      echo json_encode($this->Antrian_model->ambil_semua_antrian($tempat));
    }
  }

  public function cek_antrian($tempat)
  {
    if (!isset($this->session->logged_in))
    {
      echo json_encode(array('status_report'=>'pi login dulu'));
    }
    else
    {
      $antrian = $this->decode();
      $nomor_antri = $antrian->nomor + 1;
      $hasil = $this->Antrian_model->ambil_antrian_by_nomor_antri($nomor_antri, $antrian->tempat);
      echo json_encode($hasil);
    }
  }

  public function layani_cs($id)
  {
    $data = array();
    $data['proses'] = $this->Antrian_model->layani_antrian($id, 'cs');
    echo json_encode($data);
  }

  public function decode()
  {
    $data = file_get_contents('php://input');
    $Obj = json_decode($data);
    return $Obj;
  }
}

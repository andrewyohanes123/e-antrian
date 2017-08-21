<?php
class Antrian_model extends CI_Model
{
  public function __construct()
  {
    parent::__construct();
  }

  public function ambil_nomor($tempat, $nomor)
  {
    if ($tempat == 'cs')
    {
      $data = array(
        'id_antrian'=>null,
        'notelp_pengantri'=>$nomor,
        'status_antrian'=>'belum'
      );
      $query = $this->db->insert('antrian_cs', $data);
    }
    else
    {
      $data = array(
        'id_antrian'=>null,
        'notelp_pengantri'=>$nomor,
        'status_antrian'=>'belum'
      );
      $query = $this->db->insert('antrian_teller', $nomor);
    }
    $insert_id = $this->db->insert_id();
    $this->session->set_userdata('no_antrian', $insert_id);
    $data = array('noantrian'=>$insert_id, 'affected_rows'=>$this->db->affected_rows());
    return $data;
  }

  public function ambil_semua_antrian($tempat)
  {
    if ($tempat == 'cs')
    {
      return $this->db->get('antrian_cs')->result_array();
    }
    elseif ($tempat == 'teller')
    {
      return $this->db->get('antrian_teller')->result_array();
    }
    else
    {
      return array('error'=>'apa apaan ini!');
    }
  }

  public function layani_antrian($id, $tempat)
  {
    $data = array(
      'status_antrian'=>'sementara'
      );
    $this->db->where('id_antrian', $id);
    if ($tempat == 'cs')
    {
      return $this->db->update('antrian_cs', $data);
    }
    elseif ($tempat == 'teller')
    {
       return $this->db->update('antrian_teller', $data);
    }
  }

  public function ambil_antrian_by_nomor_antri($nomor, $tempat)
  {
    $this->db->select('*');
    if ($tempat == 'cs')
    {
      $this->db->from('antrian_cs');
      $this->db->where('id_antrian', $nomor);
      return $this->db->get()->result_array();
    }
    else if ($tempat == 'teller')
    {
      $this->db->from('antrian_teller');
      $this->db->where('id_antrian', $nomor);
      return $this->db->get->result_array();
    }
  }
}

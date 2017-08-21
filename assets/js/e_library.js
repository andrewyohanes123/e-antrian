$(document).ready(function(){
  var url = window.location.origin;
  var resX = window.screen.width;

  $('#alert').hide();
  $('#alert_pembaca').hide();
  $('#tambah_buku').hide();
  // $('#dropdown-buku').hide()
  // $('#dropdown-lagu').hide()
  // $('#dropdown-pengaturan').hide()

  $('form#login_user').submit(function(e) {
    e.preventDefault();
    var uname = $("input#uname").val();
    var passwd = $("input#passwd").val();

    $.ajax({
      type : "POST",
      url : url + "/e_library/login/login_user",
      data : { username : uname, password : passwd },
      success : function (data)
      {
        if (data.length == 1)
        {
          $('#alert').slideDown('fast');
          $('#alert').addClass('alert-success');
          $('#alert_msg').append('Loading...');
          window.location.replace(url + '/e_library/user')

          $('.close').click(function(){
            $('#alert').slideUp('fast');
            $('#alert').removeClass('alert-success');
            $('#alert_msg').empty();
          })
        }
        else
        {
          $('#alert').slideDown('fast');
          $('#alert').addClass('alert-danger');
          $('#alert_msg').append('Username dan password salah!');

          $('#alert').click(function(){
            $('#alert').slideUp('fast');
            $('#alert').removeClass('alert-danger');
            $('#alert_msg').empty();
          })
        }
      }
    });

  });

  $('form#login_pembaca').submit(function(e){
    e.preventDefault();
    var nama = $('input#nama').val();
    var email = $('input#email').val();

    $.ajax({
      type : "POST",
      url : url + "/e_library/login/login_pembaca",
      data : { nama : nama, email : email },
      success : function (data)
      {
        if (data.terdaftar == 1)
        {
          $('#alert_pembaca').slideDown();
          window.location.replace(url + "/e_library/pembaca");
        }
        else
        {
          $('#alert_pembaca').slideDown();
          $('#alert_pembaca').empty();
          $("#alert_pembaca").append(data.msg);
        }
      }
    });
  });

  $.ajax({
    type : "GET",
    url : url + "/e_library/pembaca/load_kategori",
    data : {},
    success : function(data)
    {
      $.each(data, function(key, hasil){
        $('#kategori_buku').append(
          '<a href="javascript:void(0);" class="kat" id="'+ hasil.id_kategori +'"><div class="well well-sm kategori" id="'+ hasil.id_kategori +'">' +
          '<p>' +
          '<span class="fa '+ hasil.icon_kategori +'"></span>&nbsp;' +
          hasil.kategori +
          '</p>' +
          '</div></a>'
        )
      });
    }
  });

  $.ajax({
    type : "POST",
    url : url + "/e_library/pembaca/get_buku",
    data : {},
    success : function(data)
    {
      $.each(data, function(key, hasil){
        if (hasil.cover_buku == "NULL" || hasil.cover_buku == "")
        {
          var cover = "default_cover.png";
        }
        else
        {
          var cover = hasil.cover_buku;
        }
        var nama = hasil.nama_buku;
        if (nama.length > 16)
        {
          var nama_split = nama.split(" ");
          var judul = '<h3 class="judul" alt="' + hasil.nama_buku + '" title="' + hasil.nama_buku + '">' + nama_split[0] + " " + '...</h3>';
        }
        else
        {
          var judul = '<h3 class="judul" alt="' + hasil.nama_buku + '" title="' + hasil.nama_buku + '">' + hasil.nama_buku + '</h3>';
        }
        $('#buku').append(
          '<div class="col-md-3 col-sm-6">'+
          '<div class="thumbnail">'+
          '<img src="'+ url + "/e_library/assets/img/" + cover +'" />'+
          '<div class="caption">'+
          '<var>' + hasil.tahun_terbit + '</var>' +
          judul +
          '<p>' + hasil.pengarang + '</p><hr>' +
          '<button class="btn btn-warning"><span class="fa fa-toggle-right fa-lg"></span>&nbsp;Baca</button>'+
          '</div>'+ // caption
          '</div>'+ // thumbnail
          '</div>' // col-md
        );
      });
    }
  });

  $.ajax({
    type : "GET",
    url : url + "/e_library/user/ambil_kategori",
    data : {},
    success : function(data)
    {
      $.each(data, function(key, kategori) {
        $('#kategori').append('<option value="'+ kategori.id_kategori +'">'+ kategori.kategori +'</option>');
        $('#kategori2').append('<option value="'+ kategori.id_kategori +'">'+ kategori.kategori +'</option>');
      });
    }
  });

  $.ajax({
    type : "GET",
    url : url + "/e_library/user/ambil_kategori",
    data : {},
    success : function(data)
    {
      $.each(data, function(key, kategori) {
        var nomor = key +1;
        $('#lst_kategori').append(
          '<tr>'+
          '<td>'+ nomor + '</td>' +
          '<td>' + kategori.kategori + '</td>' +
          '<td><span class="fa ' + kategori.icon_kategori + ' fa-lg"></span></td>' +
          '<td><button class="btn btn-warning edit_kat" id="' + kategori.id_kategori + '"><span class="fa fa-edit fa-lg"></span>&nbsp;Edit</button></td>' +
          '<td><button class="btn btn-danger hapus_kat" id="' + kategori.id_kategori + '"><span class="fa fa-remove fa-lg"></span>&nbsp;Hapus</button></td>' +
          '</tr>'
        );
      });
    }
  });

  $(document).on('click', 'button.edit', function(){
    var id = $(this).attr('id');
    $.ajax({
      type : "POST",
      url : url + "/e_library/user/get_data_buku_fisik",
      data : {id : id},
      success : function (data)
      {
        $.each(data, function(index, buku) {
          $('#jdl_buku').val(buku.judul_buku);
          $('#pengarang_buku').val(buku.pengarang);
          $('#stok_buku').val(buku.stok_buku);
          $('#tahun_terbit_buku').val(buku.tahun_terbit);
          $('#deskripsi_buku').val(buku.deskripsi_buku);
        });
      }
    });
    $('#editModal').modal('show');
    $('button#simpan_buku').click(function(){
      var judul = $('#jdl_buku').val();
      var pengarang = $('#pengarang_buku').val();
      var stok = $('#stok_buku').val();
      var kategori = $("#kategori").val();
      var tahun_terbit = $('#tahun_terbit_buku').val();
      var deskripsi = $('#deskripsi_buku').val();
      $.ajax({
        type : "POST",
        url : url + "/e_library/user/update_buku",
        data : {id : id, jdl : judul, pengarang : pengarang, tahun_terbit : tahun_terbit, stok : stok, kategori : kategori, deskripsi : deskripsi},
        success : function(data)
        {
          if (data.affected_rows > 0)
          {
            $('#jdl_buku').val('');
            $('#pengarang_buku').val('');
            $('#stok_buku').val('');
            $('#tahun_terbit_buku').val('');
            $('#deskripsi_buku').val('');

            $('#editModal').modal('hide');
            $("#buku_fisik").empty();
            $.ajax({
              type : "GET",
              url : url + "/e_library/user/list_buku_fisik",
              success : function(data)
              {
                $.each(data, function(key, buku){
                  var nomor = key +1;
                  $("#buku_fisik").append(
                  '<tr>'+
                  '<td>' + nomor + '</td>'+
                  '<td>' + buku.judul_buku + '</td>'+
                  '<td>' + buku.pengarang + '</td>'+
                  '<td>' + buku.tahun_terbit + '</td>'+
                  '<td>' + buku.kategori + '</td>'+
                  '<td>' + buku.stok_buku + '</td>'+
                  '<td><button id="' + buku.idbuku_fisik + '" class="btn btn-warning edit"><span class="fa fa-edit fa-lg"></span>&nbsp;Edit</button></td>'+
                  '<td><button id="' + buku.idbuku_fisik + '" class="btn btn-danger"><span class="fa fa-remove fa-lg"></span>&nbsp;Hapus</button></td>'+
                  '</tr>'
                );
              });
              }
            });
          }
        }
      });
    });
  });

  $('.remove-dialog').hide();

  $('a.remove-user').hover(function() {
    $('.remove-dialog').show()
  }, function() {
    $(".remove-dialog").hide()
  });

  $('#bukuFisik').click(function(){
    $('#bukuFisikBody').slideToggle('slow');
  });

  $('#bukuPdf').click(function(){
    $('#bukuPdfBody').slideToggle('slow');
  });

  $.ajax({
    type : "GET",
    url : url + "/e_library/user/list_buku_pdf",
    success : function (data)
    {
      $.each(data, function(index, pdf) {
        var nomor = index +1;
        $("#buku_pdf").append(
          '<tr>'+
          '<td>' + nomor + '</td>'+
          '<td>' + pdf.nama_buku + '</td>'+
          '<td>' + pdf.pengarang + '</td>'+
          '<td>' + pdf.tahun_terbit + '</td>'+
          '<td>' + pdf.kategori + '</td>'+
          '<td><button id="' + pdf.idbuku_fisik + '" class="btn btn-warning"><span class="fa fa-edit fa-lg"></span>&nbsp;Edit</button></td>'+
          '<td><button id="' + pdf.idbuku_fisik + '" class="btn btn-danger"><span class="fa fa-remove fa-lg"></span>&nbsp;Hapus</button></td>'+
          '</tr>'
        );
      });
    }
  })

  $(document).on('click', '.kategori', function(e) {
    var id = $(this).attr('id');
    $.ajax({
      type : "POST",
      url : url + "/e_library/pembaca/get_buku_bykategori",
      data : {id : id},
      success : function(data)
      {
        $('#buku').html(data);
      }
    })
  });

  $('#bentuk_buku').change(function(event) {
    var bentuk = $(this).val()
    if (bentuk == "pdf")
    {
      $('#pdfFile').show();
      $('#fisik').hide();
    }
    else
    {
      $('#pdfFile').hide();
      $('#fisik').show();
    }
  });

  $('#bentuk_buku2').change(function(event) {
    var bentuk = $(this).val()
    if (bentuk == "pdf")
    {
      $('#pdfFile2').show();
      $('#fisik2').hide();
    }
    else
    {
      $('#pdfFile2').hide();
      $('#fisik2').show();
    }
  });

  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });

  if (resX <= 330)
  {
    $('#wrapper').removeClass('toggled');
  }

  $(document).on('keypress', function(e){
    if (e.key == "+")
    {
      $('#tambah_buku').slideToggle('slow');
    }
  });

  $.ajax({
    type : "GET",
    url : url + "/e_library/user/get_jumlah",
    data : {},
    success : function(data)
    {
      $('#jlh_buku').append("&nbsp;" + data.jlh_buku);
      $('#jlh_pembaca').append("&nbsp;" + data.jlh_pembaca);
      $('#jlh_musik').append("&nbsp;" + data.jlh_musik);
    }
  })

  $.ajax({
    type : "GET",
    url : url + "/e_library/user/load_icon_kategori",
    success : function(data)
    {
      $.each(data, function (key, icon){
        var ikon = icon.icon_kategori.split('-');
        $('#icon_kategori').append(
          '<div class="col-xs-3">' +
          '<div style="text-align : center;" class="well well-sm icon-kategori">' +
          '<h2>' +
          '<span class="fa ' + icon.icon_kategori + ' fa-lg">' +
          '</span>'+
          '</h2>'+
          '</div>'+
          '</div>'
        )
      });
    }
  });

  $.ajax({
    url : url + "/e_library/user/get_list_musik",
    type : "GET",
    success : function(data)
    {
      $.each(data, function(key, hasil){
        $('tbody#daftar-musik').append(
          '<tr>' +
          '<td>' + hasil.judul_musik + '</td>' +
          '<td>' + hasil.artis_musik + '</td>' +
          '<td><button id="'+ hasil.file_musik +'" class="btn btn-primary play"><span class="fa fa-play fa-lg"></span>&nbsp;Play</button></td>' +
          '</tr>'
        );
      })
    }
  })

  $('form#form_upload_musik').on('submit', function(e){
    e.preventDefault();
    $(this).ajaxSubmit({
      url : url + "/e_library/user/upload_musik",
      beforeSend : function (datas)
      {
        var musik = $('#file_musik')[0].files[0].name;
        var split = musik.split(".");
      },
      uploadProgress : function (ev, position, total, percentComplete)
      {
        $('#upload_progress').css('width', percentComplete + "%");
      },
      success : function(data)
      {
        console.log(data);
        if (data.error = "<p>The filetype you are attempting to upload is not allowed.</p>")
        {
          $('#alert_gagal').slideDown();
          $('#upload_progress').removeClass('progress-bar-success');
          $('#upload_progress').addClass('progress-bar-danger');
          setTimeout(function(){
            $('#alert_gagal').slideUp();
            $('form#form_upload_musik').trigger('reset');
            $('#upload_progress').css('width', "0%");
          }, 5000);
        }
        else
        {
          $('#alert_sukses').slideDown();
          setTimeout(function(){
            $('#alert_sukses').slideUp();
          }, 5000);
        }
      }
    })
  });

  $.ajax({
    type : "GET",
    url : url + "/e_library/user/get_user_data",
    success : function (result)
    {
      $.each(result, function (key, data){
        if (data.foto_profil == "" || data.foto_profil == NULL)
        {
          var foto_profil = url + "/e_library/assets/img/Piano.png";
        }
        else
        {
          var foto_profil = data.foto_profil;
        }
        $('#foto_profil_user').attr('src', foto_profil);
        $('#foto_profil_user').attr('title', data.username);
        $('#nama_lengkap_user').val(data.nama_lengkap);
        $('#username_user').val(data.username);
        $('#email_user').val(data.email);
        $('#password_user').val(data.password);
        $('#password_user2').val(data.password);
      });
    }
  })

  $(document).on('click', 'button.play', function(e){
    var audio = $('audio');
    var button = $(this).attr('id');
    audio.attr('src', url + '/e_library/assets/musik/'+ button);
    // console.log(audio);
  })

  $('#collapse-buku').click(function(e) {
    e.preventDefault();
    $('#dropdown-buku').slideToggle('slow');
  });

  $('#collapse-lagu').click(function(e) {
    e.preventDefault();
    $('#dropdown-lagu').slideToggle('slow');
  });

  $('#collapse-pengaturan').click(function(e) {
    e.preventDefault();
    $('#dropdown-pengaturan').slideToggle('slow');
  });

  $('#logout_user').click(function() {
    window.location.replace(url + "/e_library/user/logout");
  });

  $('#logout_pembaca').click(function(){
    window.location.replace(url + "/e_library/pembaca/logout");
  });

});

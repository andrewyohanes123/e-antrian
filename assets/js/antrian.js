var app = angular.module('antrianApp', ['ngRoute', 'ngCookies']);
var baseUrl = window.location.origin + "/antrian"

app.controller('title', function($scope){
  $scope.title = "Ambil antrian";
});

app.controller('titleLogin', function($scope){
  $scope.title = "Login";
});

app.controller('antrianController', function($scope, $http, $cookieStore){
  if (!$cookieStore.get('test'))
  {
    $cookieStore.put('test', null);
  }
  $scope.kirimDataCs = function()
  {

    var data = {
      tempat : "cs",
      nomor : $scope.nomorTelp
    }
    $http.post(baseUrl+'/backend/index.php/antrian/ambil_antrian', data).then(function(hasil){
      var nomor = hasil.data.noantrian;
      $cookieStore.put('test', nomor);
      if ($cookieStore.get('test') != null)
      {
        var nomor = $cookieStore.get('test');
        var toStr = nomor.toString();
        if (toStr.length == 1)
        {
          $scope.antrian = '00'+nomor;
        }
        else if (toStr.length == 2)
        {
          $scope.antrian = '0'+nomor;
        }
        else if (toStr.length == 3)
        {
          $scope.antrian = nomor;
        }
        $scope.no_antri = $cookieStore.get('test');
      }
      // $scope.antrian = nomor;
      $('#ambil_antri').slideUp();
    });
  }

  if ($cookieStore.get('test') != null)
  {
    var nomor = $cookieStore.get('test');
    var toStr = nomor.toString();
    if (toStr.length == 1)
    {
      $scope.antrian = '00'+nomor;
    }
    else if (toStr.length == 2)
    {
      $scope.antrian = '0'+nomor;
    }
    else if (toStr.length == 3)
    {
      $scope.antrian = nomor;
    }
    $scope.no_antri = $cookieStore.get('test');
  }

  $scope.cekAntri = function()
  {
    var data = {
      nomor : $cookieStore.get('test'),
      tempat : 'cs'
    }

    $http.post(baseUrl + '/backend/index.php/antrian/cek_antrian', data).then(function(hasil){
      console.log(hasil.data)
    })
  }

  $scope.cekAntri();
})

app.controller('loginController', function($scope, $http, $cookieStore){
  $scope.login = function()
  {
    var data = {
      username : $scope.username,
      password : $scope.password
    }

    $http.post(baseUrl + '/backend/index.php/login/login_user', data).then(function(hasil){
      $cookieStore.put('username', hasil.data[0].username);
      $cookieStore.put('id_user', hasil.data[0].id_user);
      window.location.replace('dashboard.html');
    });
  }
})

$(document).on('submit', 'form', function(e){
  e.preventDefault();
  return false;
});
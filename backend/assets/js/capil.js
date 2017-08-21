var app = angular.module('capilApp', ['ngRoute']);
var url = window.location.origin;
app.controller('capilController', ['$scope', '$location' ,'$route', function($scope, $location,$route){
  $scope.currentPath = $location.path()

  $scope.kembali = function(location)
  {
    window.history.back();
  }

  if ($scope.currentPath == '/')
  {
    $('#btnKembali').hide();
  }
  else
  {
    $('#btnKembali').show();
  }

  console.log($scope.currentPath);

  $scope.tempatLahir = [{'tempat':'RS/RB'} ,{'tempat' : 'Puskesmas'}, {'tempat' :  'Polindes'}, {'tempat' : 'Rumah'}, {'tempat' : 'Lainnya'}];
  $scope.jenisKelahiran = [{'jenis':'Tunggal'}, {'jenis' : 'Kembar 2'}, {'jenis':'Kembar 3'}, {'jenis':'Kembar 4'}, {'jenis':'Lainnya'}];
  $scope.kelahiranKe = [{'no':1}, {'no':2}, {'no':3}, {'no':4}, {'no':'Lainnya'}];
  $scope.penolongKel = [{'penolongKel':'Dokter'}, {'penolongKel':'Bidan/Perawat'}, {'penolongKel':'Dukun'}, {'penolongKel':'Lainnya'}];
}])

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl : "lahir.html"
  })
  .when('/daftar_akta', {
    templateUrl : "daftar_kelahiran.html"
  })
  .when('/kelengkapan_dokumen', {
    templateUrl : "kelengkapan.html"
  })

  // $locationProvider.html5Mode({
  //   enabled : true
  //   baseRequire : false
  // });
});

$(document).on('click', '#collapse-bayi', function(){
  $('#form-bayi').slideToggle()
  $('span#icon-bayi').toggleClass('fa-minus-square');
});

$(document).on('click', '#collapse-ibu', function(){
  $('#form-ibu').slideToggle();
  $('span#icon-ibu').toggleClass('fa-minus-square');
})

$(document).on('click', '#collapse-ayah', function(){
  $('#form-ayah').slideToggle();
  $('span#icon-ayah').toggleClass('fa-minus-square');
})

$(document).on('click', '#collapse-pelapor', function(){
  $('#form-pelapor').slideToggle();
  $('span#icon-pelapor').toggleClass('fa-minus-square');
});

$(document).on('click', '#collapse-saksi1', function(){
  $('#form-saksi1').slideToggle();
  $('span#icon-saksi1').toggleClass('fa-minus-square');
})

$(document).on('click', '#daftar_kelahiran', function(){
  window.location.replace(url + '/kelahiran/daftar_akta');
})

var app = angular.module('antrianApp', ['ngRoute']);
var baseUrl = window.location.origin
app.controller('antrianController', ['$scope', '$http', function($scope, $http){
  $scope.nomorTelp = 78978979;
  $scope.kirimDataCs = function()
  {
    console.log('ada');
    // $http.post({
    //   method : "post",
    //   url : baseUrl + "/antrian/ambil_antrian",
    //   data : {
    //     tempat : "cs",
    //     nomor : $scope.nomorTelp
    //   },
    //   headers : {'Content-type':'application/x-www-form-urlencoded'}
    // }).then(function(data){
    //   console.log(data);
    // });
  }

  $scope.kirim_data_teller = function()
  {
    $http.post({
      method : "post",
      url : baseUrl + "/antrian/ambil_antrian",
      data : {
        tempat : "teller",
        nomor : $scope.nomorTelp2
      },
      headers : {'Content-type':'application/x-www-form-urlencoded'}
    }).then(function(data){
      console.log(data);
    });
  }
}])

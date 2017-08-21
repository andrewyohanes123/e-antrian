var app = angular.module('antrianApp', ['ngCookies', 'ngRoute']);
var baseUrl = window.location.origin + "/antrian";

app.controller('dashTitle', function($scope, $cookieStore){
	$scope.username = $cookieStore.get('username');
});

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl : "antrian_cs.html",
		controller : "antrianCS"
	})
	.when('/daftar_user', {
		templateUrl : "daftar_user.html",
		controller : "daftarUser"
	})
});

app.controller('daftarUser', function($scope, $http, $cookieStore){
	$scope.loadUser = function()
	{
		$http.get(baseUrl + '/backend/index.php/user/daftar_user').then(function(hasil){
			$scope.daftarUser = hasil.data;
			$scope.dataLength = hasil.data.length;
		});
	}

	$scope.tambahUser = function()
	{
		if ($scope.username == '' || $scope.username == null)
		{
			$('#not_found').slideDown();
			$('#not_found').append('<span class="fa fa-exclamation-circle fa-lg"></span>&nbsp;Masukkan username');
			setTimeout(function(){
				$('#not_found').slideUp();
				$('#not_found').empty();
			}, 2000);
		}
		else if ($scope.password == '' || $scope.password == null)
		{
			$('#not_found').slideDown();
			$('#not_found').append('<span class="fa fa-exclamation-circle fa-lg"></span>&nbsp;Masukkan password');
			setTimeout(function(){
				$('#not_found').slideUp();
				$('#not_found').empty();
			}, 2000);
		}
		else if ($scope.password2 == '' || $scope.password2 == null)
		{
			$('#not_found').slideDown();
			$('#not_found').append('<span class="fa fa-exclamation-circle fa-lg"></span>&nbsp;Masukkan ulang password');
			setTimeout(function(){
				$('#not_found').slideUp();
				$('#not_found').empty();
			}, 2000);
		}
		else if ($scope.password != $scope.password2)
		{
			$('#not_found').slideDown();
			$('#not_found').append('<span class="fa fa-exclamation-circle fa-lg"></span>&nbsp;Password tidak sama');
			setTimeout(function(){
				$('#not_found').slideUp();
				$('#not_found').empty();
			}, 2000);
		}
		else
		{
			var data = {
			username : $scope.username,
			password : $scope.password
		}
			$http.post(baseUrl + '/backend/index.php/user/tambah_user', data).then(function(hasil){
				if(hasil.data.data == true)
				{
					$scope.username = '';
					$scope.password = '';
					$scope.password2 = '';
					$('#found').slideDown();
					setTimeout(function(){
						$('#found').slideUp();
						$scope.loadUser();
					}, 2000);
				}
				else
				{
					$('#not_found').slideDown();
					$('#not_found').append('<span class="fa fa-exclamation-circle fa-lg"></span>&nbsp;Tambah user gagal');
					setTimeout(function(){
						$('#not_found').slideUp();
						$('#not_found').empty();
					}, 2000);
				}
			})
		}
	}

	$scope.editUser = function(user_id, username)
	{
		$scope.id = user_id;
		console.log(user_id);
		$scope.username = username;
		$('#tambah').slideUp();
		$('#password').slideUp();
		$('#button_pass').fadeIn();
	}

	$('#rubah_pass').click(function(){
		$('#password').slideToggle();
	});

	$('#batal').click(function(){
		$('#button_pass').fadeToggle();
		if ($('#password').attr('display') != 'block')
		{
			$('#password').slideDown();
		}
		$('#tambah').slideDown();
		$scope.username = ''
	});

	$scope.updateUser = function()
	{
		var password = document.getElementById('password').style.display;
		if (password == 'none')
		{
			var data = {
				id_user : $scope.id,
				username : $scope.username,
				password : ''
			}

			$http.post(baseUrl + '/backend/index.php/user/update_user', data).then(function(hasil){
					if (hasil.data == true)
					{
						$scope.username = '';
						$('#tambah').slideToggle();
						$('#button_pass').fadeToggle();
						$('#password').slideToggle();
						$scope.loadUser();
					}
			});
		}
		else if (password != 'none')
		{
			if ($scope.password == null || $scope.password == '')
			{
				$('#not_found').slideDown();
				$('#not_found').append('<span class="fa fa-exclamation-circle fa-lg"></span>&nbsp;Password kosong');
				setTimeout(function(){
					$('#not_found').slideUp();
					$('#not_found').empty();
				}, 2000);	
			}
			else if ($scope.password2 == '' || $scope.password2 == null)
			{
				$('#not_found').slideDown();
				$('#not_found').append('<span class="fa fa-exclamation-circle fa-lg"></span>&nbsp;Masukkan ulang password');
				setTimeout(function(){
					$('#not_found').slideUp();
					$('#not_found').empty();
				}, 2000);	
			}
			else if ($scope.password2 != $scope.password)
			{
				$('#not_found').slideDown();
				$('#not_found').append('<span class="fa fa-exclamation-circle fa-lg"></span>&nbsp;Password tidak sama');
				setTimeout(function(){
					$('#not_found').slideUp();
					$('#not_found').empty();
				}, 2000);	
			}
			else
			{
				var data = {
					id_user : $scope.id,
					username : $scope.username,
					password : $scope.password
				}
				$http.post(baseUrl + '/backend/index.php/user/update_user', data).then(function(hasil){
					if (hasil.data == true)
					{
						$scope.username = '';
						$scope.password = '';
						$scope.password2 = '';
						$('#tambah').slideToggle();
						$('#button_pass').fadeToggle();
						$scope.loadUser();
					}
				});
			}
		}
	}

	$scope.deleteUser = function(id)
	{
		var data = {
			id : id
		}
		$http.post(baseUrl + '/backend/index.php/user/delete_user', data).then(function(hasil){
			if (hasil.data.status == true)
			{
				$scope.loadUser();
			}
			else
			{
				alert('Error!');
			}
		});
	}

	$scope.id_user = $cookieStore.get('id_user');

	$scope.loadUser();
});

app.controller('cekSesi', function($scope, $http, $cookieStore){
	$scope.cekSesi = function()
	{
		$http.get(baseUrl + "/backend/index.php/user/session_check").then(function(hasil){
			if (hasil.data.logged_in != 'login')
			{
				alert('Sesi Anda telah habis! silahkan login kembali');
				$cookieStore.remove('username');
				window.location.replace('login.html');
			}
		});
	}

	$scope.logout = function()
	{
		$http.get(baseUrl + "/backend/index.php/user/logout").then(function(hasil){
			// window.location.replace('login.html');
			// $cookieStore.remove('username');
			// $cookieStore.remove('id_user');
			console.log(hasil.data);
		});
	}

	$scope.cekSesi();
});

app.controller('urlCheck', function($scope, $location){
	$scope.currentPath = $location.path();

	if ($scope.currentPath == '/')
	{
		$('#antrian_cs').addClass('active');
	}
	else if ($scope.currentPath == '/antrian_teller')
	{
		$('#antrian_teller').addClass('active');
	}
	else if ($scope.currentPath == '/daftar_antrian')
	{
		$('#daftar_antrian').addClass('active');
	}
	else if ($scope.currentPath == '/daftar_user')
	{
		$('#daftar_user').addClass('active');
	}
});

$(document).on('click', '#menu li a', function(){
	var activeMenu = 0;
	$('ul#menu li').removeClass('active');
	$(this).parent().addClass('active');
});

app.controller('antrianCS', function($scope, $http, $cookieStore){
	$scope.loadAntrian = function()
	{
		$http.get(baseUrl + "/backend/index.php/antrian/daftar_antrian/cs").then(function(hasil){
			$scope.antrianCS = hasil.data
			$scope.besarData = hasil.data.length;
			angular.forEach(hasil.data, function(val, key){
				valStr = val.id_antrian.toString();
				if (valStr.length == 1)
				{
					$scope.nomor_antri = "00"+val.id_antrian;
				}
				else if (valStr.length == 2)
				{
					$scope.nomor_antri = "0"+val.id_antrian;
				}
				else
				{
					$scope.nomor_antri = val.id_antrian;
				}
			})
		});
	}

	$scope.layani = function(id)
	{
		$http.get(baseUrl + "/backend/index.php/antrian/layani_cs/" + id).then(function(hasil){
			console.log(hasil.data);
		})
	}

	// setInterval(function(){
	// 	$scope.loadAntrian();
	// }, 1000);

	$scope.loadAntrian();
});

$(document).on('submit', 'form', function(e){
  e.preventDefault();
  return false;
});
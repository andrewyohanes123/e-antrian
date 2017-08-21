<div class="container-fluid">
  <div class="row">
    <div class="col-md-3"></div>
    <!--  -->
    <div class="col-md-6">
      <div class="wrapper" ng-controller="antrianController">
        <center><h2><span class="fa fa-ticket fa-lg"></span>&nbsp;Ambil nomor antrian</h2></center>
        <hr>
        <!--  -->
        <div class="row">
          <div class="col-sm-6">
            <div class="wrapper cs">
              <h3 class="tengah">Customer Service</h3>
              <hr>
              <div class="input-group">
                <span class="input-group-addon"><span class="fa fa-phone fa-lg"></span></span>
                <input ng-model="nomorTelp" type="text" class="form-control" placeholder="Masukkan nomor telepon" name="" value="">
              </div>
              <br>
              <button ng-click="kirimDataCs()" type="button" class="ambil">ambil nomor</button>
            </div>
          </div>
          <!--  -->
          <div class="col-sm-6">
            <div class="wrapper teller">
              <h3 class="tengah">Teller</h3>
              <hr>
              <div class="input-group">
                <span class="input-group-addon"><span class="fa fa-phone fa-lg"></span></span>
                <input ng-model="nomorTelp2" type="text" class="form-control" placeholder="Masukkan nomor telepon" name="" value="">
              </div>
              <br>
              <button ng-click="kirim_data_teller()" type="button" class="ambil" name="button">ambil nomor</button>
            </div>
          </div>
          <!--  -->
        </div>
        <!--  -->
      </div>
    </div>
    <!--  -->
    <div class="col-md-3"></div>
  </div>
</div>

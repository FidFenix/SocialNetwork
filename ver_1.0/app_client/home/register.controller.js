(function(){
  angular
    .module('socialnetworkApp')
    .controller('registerCtrl', registerCtrl);
  registerCtrl.$inject = ['$scope','registerUser','geoLocation'];
  function registerCtrl($scope,registerUser, geolocation) {
    var vm = this;
    vm.message = "Checking your location";

    vm.getData = function (position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude;
      vm.message = "Searching for nearby places";
      var postData;
      postData = {
        name :    vm.register.name,
        firstname:vm.register.firstname,
        lastname: vm.register.lastname,
        email:    vm.register.email,
        password: vm.register.password,
        lat: lat,
        lng: lng
      };
      registerUser.register(lat, lng,postData)
        .success(function(data) {
          vm.message = "User Create";
          alert("USUARIO CREADO");
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function() {
        vm.message = "Geolocation is not supported by this browser.";
      });
    };
    
    vm.registerSubmit = function(){
      geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);
    };
  };
})();

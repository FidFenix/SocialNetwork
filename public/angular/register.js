angular.module('registerApp', []);

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
  return function (distance) {
    var numDistance, unit;
    if (distance && _isNumeric(distance)) {
      if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
      } else {
        numDistance = parseInt(distance * 1000,10);
        unit = 'm';
      }
      return numDistance + unit;
    } else {
      return "?";
    }
  };
};

var geolocation = function () {
  var getPosition = function (cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    }
    else {
      cbNoGeo();
    }
  };
  return {
    getPosition : getPosition
  };
};
var registerCtrl = function ($scope, registerUser, geolocation) {
  $scope.message = "Checking your location";

  $scope.getData = function (position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude;
    $scope.message = "Searching for nearby places";
    var postData;
    postData = {
      name : $scope.register.name,
      firstname:$scope.register.firstname,
      lastname:$scope.register.lastname,
      email: $scope.register.email,
      password:$scope.register.password,
      lat: lat,
      lng: lng
    };
    registerUser.register(lat, lng,postData)
      .success(function(data) {
        alert("luego del post");
        $scope.message = "User Create";
      })
      .error(function (e) {
        alert("ERROR"+e);
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });
  };

  $scope.showError = function (error) {
    $scope.$apply(function() {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function () {
    $scope.$apply(function() {
      $scope.message = "Geolocation is not supported by this browser.";
    });
  };
  
  $scope.registerSubmit = function(){
    alert("entro");
    geolocation.getPosition($scope.getData,$scope.showError,$scope.noGeo);
  };
};

var registerUser = function ($http) {
  var register = function (lat, lng, postData) {
    alert("antes de hacer post");
    alert("postDATA:" + JSON.stringify(postData));
    /*return $http({
      method:'POST',
      url: '/api/users/create',
      body: {text:'text'}
    });*/
    return $http.post('/api/users/create',JSON.stringify(postData));
  };
  return {
    register : register
  };
};

angular
  .module('registerApp')
  .controller('registerCtrl', registerCtrl)
  .filter('formatDistance', formatDistance)
  .service('registerUser', registerUser)
  .service('geolocation', geolocation);


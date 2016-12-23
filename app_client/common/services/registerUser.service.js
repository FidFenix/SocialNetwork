(function(){
  angular
    .module('socialnetworkApp')
    .service('registerUser', registerUser);
  registerUser.$inject = ['$http'];
  function registerUser($http) {
    var register = function (lat, lng, postData) {
      return $http.post('/api/users/create',JSON.stringify(postData));
    };
    return {
      register : register
    };
  };
})();


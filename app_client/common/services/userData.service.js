(function() {

  angular
    .module('socialnetworkApp')
    .service('userData', userData);

  userData.$inject = ['$http', 'authentication'];
  function userData ($http, authentication) {
    var getUserData = function(data){
        return $http.post('/api/users/full',data,{
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            } 
        });
    };
    var getUserDataById = function(userid){
        return $http.get('/api/users/partial/'+userid);
    };
    return {
      getUserData : getUserData,
      getUserDataById : getUserDataById

    };
  }

})();

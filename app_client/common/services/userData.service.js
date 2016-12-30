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
    var updateUserData = function(data){
        return $http.post('/api/users/update',data,{
          headers: {
                Authorization: 'Bearer '+ authentication.getToken()
          } 
        });
    };
    var getUsers = function(data){
      return $http.get('/api/users');
    };
    var addFriend = function(data){
        return $http.post('/api/users/friend',data,{
          headers: {
                Authorization: 'Bearer '+ authentication.getToken()
          } 
        });
    };
    return {
      getUserData : getUserData,
      getUserDataById : getUserDataById,
      updateUserData : updateUserData,
      getUsers : getUsers,
      addFriend : addFriend

    };
  }

})();

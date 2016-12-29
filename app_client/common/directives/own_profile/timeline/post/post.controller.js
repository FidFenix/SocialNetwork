(function () {

  angular
    .module('socialnetworkApp')
    .controller('postCtrl', postCtrl);

  postCtrl.$inject = ['$scope','$location', 'authentication','userData'];
  function postCtrl($scope,$location, authentication,userData) {

    $scope.userImage = function(userid){
      userData.getUserDataById(userid)
        .success(function(data){
          return data.profilePhoto;
        })
        .error(function(err){
          alert(err);
        });
    };
    $scope.currentUser = authentication.currentUser();

  }
})();
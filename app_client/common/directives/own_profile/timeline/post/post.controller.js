(function () {

  angular
    .module('socialnetworkApp')
    .controller('postCtrl', postCtrl);

  postCtrl.$inject = ['$scope','$location', 'authentication','userData'];
  function postCtrl($scope,$location, authentication,userData) {
    $scope.currentUser = authentication.currentUser();
    $scope.publications=[];
    userData.getUserData({})
        .success(function(data){
          $scope.photo=data.profilePhoto;
          for(var i=0;data.publications &&i<data.publications.length;i++){
            $scope.publications.push({
              date:data.publications[i].date,
              text:data.publications[i].text,
              photo:data.publications[i].publicationPhoto
            });
          }
        })
        .error(function(err){
          alert(err);
    });


  }
})();
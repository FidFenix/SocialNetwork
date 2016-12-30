(function () {

    angular
        .module('socialnetworkApp')
        .controller('postStateCtrl', postStateCtrl);

    postStateCtrl.$inject = ['$scope','$location', 'authentication','userData'];
    function postStateCtrl($scope,$location, authentication,userData) {

        $scope.addPhoto = function(){
            $scope.uploadPhoto="data:"+$scope.photo.filetype+";base64,"+$scope.photo.base64;
        };
        
        //$scope.returnPage = $location.search().page || '/';
        $scope.returnPage="/home";
        $scope.submitPublication = function () {
            userData.createPublication({text:$scope.text,photo:$scope.uploadPhoto})
                .success(function(data){
                    $location.path("/profile");
                })
                .error(function(err){
                    alert(err);
                });
        };

    }

})();
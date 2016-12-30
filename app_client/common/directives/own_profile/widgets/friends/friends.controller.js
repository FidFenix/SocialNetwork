(function () {

    angular
        .module('socialnetworkApp')
        .controller('friendsCtrl', friendsCtrl);

    friendsCtrl.$inject = ['$scope', 'userData'];
    function friendsCtrl($scope, userData) {
        $scope.friendPhotos=[];
        userData
            .getUserData({})
                .success(function(data){
                    $scope.friends=data.friends;
                    for (var i = 0; $scope.friends && i<$scope.friends.length && i < 8; i++) {
                    userData.getUserDataById($scope.friends[i].userId)
                    .success(function (data) {
                        $scope.friendPhotos.push({
                            id: data.id,
                            profilePhoto: data.profilePhoto
                        });
                    })
                    .error(function (err) {
                        alert("Error de fotos amigos profile");
                    });
        }
                })
                .error(function(err){
                    alert(err);
                });
        


    }
})();
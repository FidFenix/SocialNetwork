(function () {

    angular
        .module('socialnetworkApp')
        .controller('pageHeaderCtrl', pageHeaderCtrl);

    pageHeaderCtrl.$inject = ['$scope', 'userData'];
    function pageHeaderCtrl($scope, userData) {
        for (var i = 0; i <$scope.friends && $scope.friends.length && i < 8; i++) {
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
    }
})();
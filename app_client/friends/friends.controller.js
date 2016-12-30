(function(){
    angular
        .module('socialnetworkApp')
        .controller('friendsCtrl',friendsCtrl);
    friendsCtrl.$inject = ['$http','authentication','userData'];
    function friendsCtrl($http,authentication,userData){
        var vm = this;
        var user;
        vm.friendPhotos=[];
        userData.getUserData({})
            .success(function(data){
                user = data;
                vm.pageHeader = {
                    name:user.name,
                    friends:user.friends,
                    cover:user.coverPage,
                    profilePhoto:user.profilePhoto
                };
                vm.photos=user.photos;
                vm.friends = user.friends;
                return false;
            })
            .error(function(err){
                 alert(err);
            });
    }
})();
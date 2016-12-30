(function(){
    angular
        .module('socialnetworkApp')
        .controller('photosCtrl',photosCtrl);
    photosCtrl.$inject = ['$http','authentication','userData'];
    function photosCtrl($http,authentication,userData){
        var vm = this;
        var user;
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
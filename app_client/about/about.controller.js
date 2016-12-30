(function(){
    angular
        .module('socialnetworkApp')
        .controller('aboutCtrl',aboutCtrl);
    aboutCtrl.$inject = ['$http','authentication','userData'];
    function aboutCtrl($http,authentication,userData){
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
                vm.about={
                    name:user.name,
                    email:user.email,
                    address:user.address,
                    job:user.job,
                    birthdate:user.birthdate,
                    phone:user.phone,
                    description:user.description,
                    url:user.url
                };
                vm.photos=user.photos;
                vm.friend = user.friends;
                return false;
            })
            .error(function(err){
                 alert(err);
            });
         
    }
})();
(function(){
    angular
        .module('socialnetworkApp')
        .controller('profileCtrl',profileCtrl);
    profileCtrl.$inject = ['$http','authentication','userData'];
    function profileCtrl($http,authentication,userData){
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
                vm.about ={
                    birth : user.birthdate,
                    job:user.job,
                    gender:user.gender,
                    address:user.address
                };
                vm.friend = user.friends;
                vm.timeline = user.publications;
                return false;
            })
            .error(function(err){
                 alert(err);
            });
         
    }
})();
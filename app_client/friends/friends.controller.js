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
                for(var i=0;vm.friends && i<vm.friends.length;i++){
                    userData.getUserDataById(vm.friends[i].userId)
                        .success(function (data) {
                            vm.friendPhotos.push({
                                id: data.id,
                                profilePhoto: data.profilePhoto,
                                name:data.name,
                                job:data.job
                            });
                        })
                        .error(function (err) {
                            alert("Error de fotos amigos profile");
                        });
                }
                return false;
            })
            .error(function(err){
                 alert(err);
            });
    }
})();
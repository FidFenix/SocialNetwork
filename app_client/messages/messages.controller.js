(function(){
    angular
        .module('socialnetworkApp')
        .controller('messagesCtrl',messagesCtrl);
    messagesCtrl.$inject = ['$http','authentication','userData'];
    function messagesCtrl($http,authentication,userData){
        var vm = this;
        vm.friendSchema=[];
        userData.getUserData({})
            .success(function(data){
                vm.user = data;
                vm.photos=vm.user.photos;
                vm.friends = vm.user.friends;
                for(var i=0;vm.friends && i<vm.friends.length;i++){
                    userData.getUserDataById(vm.friends[i].userId)
                        .success(function (data) {
                            vm.friendSchema.push({
                                id: data.id,
                                profilePhoto: data.profilePhoto,
                                name:data.name,
                                job:data.job,
                                chat:vm.friends[i].chat                 
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
        vm.changeChat=function(friend){
            vm.friendchat= friend;
        };
    }
})();
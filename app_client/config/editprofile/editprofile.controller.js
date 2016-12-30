(function () {

    angular
        .module('socialnetworkApp')
        .controller('editProfileCtrl', editProfileCtrl);

    editProfileCtrl.$inject = ['$location', 'authentication','userData'];
    function editProfileCtrl($location, authentication,userData) {
        var vm = this;
        userData.getUserData({})
            .success(function(data){
                vm.user=data;
            })
            .error(function(err){
                alert(err);
            });
        vm.changeAvatar = function(){
            vm.user.profilePhoto="data:"+vm.avatar.filetype+";base64,"+vm.avatar.base64;
        };
        vm.changeCover = function(){
            vm.user.coverPage="data:"+vm.cover.filetype+";base64,"+vm.cover.base64;
        };
        //vm.returnPage = $location.search().page || '/';
        vm.returnPage="/home";
        vm.submitEdit = function () {
            userData.updateUserData(vm.user)
                .success(function(data){
                    $location.path("/profile");
                })
                .error(function(err){
                    alert(err);
                });
        };

    }

})();
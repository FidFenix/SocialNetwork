(function(){
    angular
        .module('socialnetworkApp')
        .controller('userListCtrl',userListCtrl);
    userListCtrl.$inject = ['$http','authentication','userData'];
    function userListCtrl($http,authentication,userData){
        var vm = this;
        userData.getUsers({})
            .success(function(data){
                vm.users = data;
                return false;
            })
            .error(function(err){
                 alert(err);
            });
        vm.addFriend=function(id){
            userData.addFriend({userid:id})
                .success(function(data){

                })
                .error(function(err){
                    alert(err);
                });
        };
    }
})();
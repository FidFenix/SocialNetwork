(function () {

    angular
        .module('socialnetworkApp')
        .controller('indexCtrl', indexCtrl);

    indexCtrl.$inject = ['$location', 'authentication'];
    function indexCtrl($location, authentication) {
        var vm = this;

        vm.pageHeader = {
            title: 'Sign in to Loc8r'
        };

        vm.credentialsLogin = {
            email: "",
            password: ""
        };
        vm.credentialsRegister = {
            name: "",
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        };
        //vm.returnPage = $location.search().page || '/';
        vm.returnPage="/home";
        vm.onSubmitLogin = function () {
            alert("hola");
            vm.formError = "";
            if (!vm.credentialsLogin.email || !vm.credentialsLogin.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doLogin();
            }
        };

        vm.doLogin = function () {
            vm.formError = "";
            alert("hola");
            authentication
                .login(vm.credentialsLogin)
                .error(function (err) {
                    vm.formError = err;
                })
                .then(function () {
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                });
        };

        vm.onSubmitRegister = function () {
            vm.formError = "";
            if (!vm.credentialsRegister.name || !vm.credentialsRegister.email || !vm.credentialsRegister.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doRegister();
            }
        };

        vm.doRegister = function () {
            vm.formError = "";
            authentication
                .register(vm.credentialsRegister)
                .error(function (err) {
                    vm.formError = err;
                })
                .then(function () {
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                });
        };


    }

})();
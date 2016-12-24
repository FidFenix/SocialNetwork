(function(){
  angular.module('socialnetworkApp',['ngRoute','ngSanitize','ui.bootstrap']);

  function config($routeProvider,$locationProvider){
    $routeProvider
      .when('/',{
        templateUrl:'/home/home.view.html'
        //controller: 'registerCtrl',
        //controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }
  angular
    .module('socialnetworkApp')
    .config(['$routeProvider','$locationProvider',config]);
})();
(function(){
  angular.module('socialnetworkApp',['ngRoute','ngSanitize','ui.bootstrap','naif.base64']);

  function config($routeProvider,$locationProvider){
    $routeProvider
      .when('/',{
        templateUrl:'/home/home.view.html'
        //controller: 'registerCtrl',
        //controllerAs: 'vm'
      })
      .when('/profile',{
        templateUrl:'/profiles/own_profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .when('/index',{
        templateUrl:'index/index.view.html',
        controller: 'indexCtrl',
        controllerAs: 'vm'
        
      })
      .when('/editprofile',{
        templateUrl:'/config/editprofile/editprofile.view.html',
        controller: 'editProfileCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }
  angular
    .module('socialnetworkApp')
    .config(['$routeProvider','$locationProvider',config]);
})();

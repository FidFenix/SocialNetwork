(function(){
  angular.module('socialnetworkApp',['ngRoute','ngSanitize','ui.bootstrap','naif.base64','ngLoad']);

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
      .when('/photos',{
        templateUrl:'/photos/photos.view.html',
        controller: 'photosCtrl',
        controllerAs: 'vm'
      })
      .when('/messages',{
        templateUrl:'/messages/messages.view.html',
        controller: 'messagesCtrl',
        controllerAs: 'vm'
      })
      .when('/friends',{
        templateUrl:'/friends/friends.view.html',
        controller: 'friendsCtrl',
        controllerAs: 'vm'
      })
      .when('/userlist',{
        templateUrl:'/userlist/userlist.view.html',
        controller: 'userListCtrl',
        controllerAs: 'vm'
      })
      .when('/about',{
        templateUrl:'/about/about.view.html',
        controller: 'aboutCtrl',
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

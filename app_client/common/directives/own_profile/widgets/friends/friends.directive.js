(function(){
  angular
    .module('socialnetworkApp')
    .directive('friends',friends);

  function friends(){
    return {
      restrict : 'EA',
      templateUrl : '/common/directives/own_profile/widgets/friends/friends.template.html',
      controller: 'friendsCtrl'
    };
  }
})();

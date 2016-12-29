(function(){
  angular
    .module('socialnetworkApp')
    .directive('friends',friends);

  function friends(){
    return {
      restrict : 'EA',
      templateUrl : '/common/directives/pageHeader/widgets/friends/friends.template.html'
    };
  }
})();

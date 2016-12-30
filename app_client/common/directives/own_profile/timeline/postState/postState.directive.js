(function(){
  angular
    .module('socialnetworkApp')
    .directive('postState',postState);

  function postState(){
    return {
      restrict : 'EA',
      templateUrl : '/common/directives/own_profile/timeline/postState/postState.template.html',
      controller: 'postStateCtrl'
    };
  }
})();
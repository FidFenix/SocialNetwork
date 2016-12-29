(function(){
  angular
    .module('socialnetworkApp')
    .directive('pageHeader',pageHeader);

  function pageHeader(){
    return {
      restrict : 'EA',
      scope: {
        content : '=content'
      },
      templateUrl : '/common/directives/own_profile/pageHeader/pageHeader.template.html',
      controller: 'pageHeaderCtrl'
    };
  }
})();

(function(){
  angular
    .module('socialnetworkApp')
    .directive('timeline',timeline);

  function timeline(){
    return {
      restrict : 'EA',
      scope: {
        content : '=content'
      },
      templateUrl : '/common/directives/own_profile/timeline/timeline.template.html'
    };
  }
})();
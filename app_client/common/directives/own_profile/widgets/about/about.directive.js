(function(){
  angular
    .module('socialnetworkApp')
    .directive('about',about);

  function about(){
    return {
      restrict : 'EA',
      scope: {
        content : '=content'
      },
      templateUrl : '/common/directives/own_profile/widgets/about/about.template.html'
    };
  }
})();

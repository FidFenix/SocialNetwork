(function(){
  angular
    .module('socialnetworkApp')
    .directive('navigation',navigation);

  function footerGeneric(){
    return {
      restrict : 'EA',
      templateUrl : '/common/directives/navigation/navigation.template.html'
    };
  }
})();

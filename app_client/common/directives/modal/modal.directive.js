(function(){
  angular
    .module('socialnetworkApp')
    .directive('modal',modal);

  function modal(){
    return {
      restrict : 'EA',
      templateUrl : '/common/directives/navigation/modal.template.html'
    };
  }
})();

(function(){
  angular
    .module('socialnetworkApp')
    .directive('group',group);

  function group(){
    return {
      restrict : 'EA',
      templateUrl : '/common/directives/own_profile/widgets/group/group.template.html'
    };
  }
})();

(function(){
  angular
    .module('socialnetworkApp')
    .directive('chat',chat);

  function chat(){
    return {
      restrict : 'EA',
      scope: {content: '=content'},
      templateUrl : '/common/directives/chat/chat.template.html'
    };
  }
})();

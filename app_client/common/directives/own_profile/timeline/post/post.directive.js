(function(){
  angular
    .module('socialnetworkApp')
    .directive('post',post);

  function post(){
    return {
      restrict : 'EA',
      scope: {
        content : '=content'
      },
      templateUrl : '/common/directives/own_profile/timeline/post/post.template.html',
      controller : 'postCtrl'
    };
  }
})();
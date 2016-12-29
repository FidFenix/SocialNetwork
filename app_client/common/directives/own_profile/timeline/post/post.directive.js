(function(){
  angular
    .module('socialnetworkApp')
    .directive('post',post);

  function post(){
    return {
      restrict : 'EA',
      templateUrl : '/common/directives/own_profile/timeline/post/post.template.html'
    };
  }
})();
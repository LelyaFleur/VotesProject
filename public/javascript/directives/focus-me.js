angular.module('VotesProject').directive('focusMe', function() {
   return function(scope, elem, attr) {
      scope.$on(attr.focusMe, function(e) {
      	console.log(elem);
          elem[0].focus();
      });
   };
});
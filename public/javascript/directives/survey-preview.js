angular.module('VotesProject')
.directive('surveyPreview', function(){
	    return {
	      restrict: 'E',
	      templateUrl: 'templates/directives/survey-preview.html',
	      replace: true,
	      scope: {
	      	survey: "="
	      },
	      controller: function($scope, ModalService){
	      	$scope.participation = false;
	      	$scope.showPopup = function() {
	        ModalService.showModal({
	            templateUrl: '/templates/modal.html',
	            controller: function($scope, close) {
 							$scope.close = function(result) {
 							close(result, 500); // close, but give 500ms for bootstrap to animate
 						};

				}
	        }).then(function(modal) {
		            modal.element.modal();
		            modal.close.then(function(result) {
		                $scope.message = "You said " + result;
		            });
	        	});
    		};   
	      }
	    }
	})
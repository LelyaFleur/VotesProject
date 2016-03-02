angular.module('VotesProject').controller('SurveyController',

	function($scope, ModalService, Survey){
	      	
	      	$scope.participation = false;
	      	$scope.DNI = undefined;
	      	$scope.answers = {};

	      	$scope.sendSurvey = function() {
	      		var submission = [];
	      		var qAndA = {};
	      		var i = 0;
	      		for(var question in $scope.survey.questions){
	      			qAndA.questionId = $scope.survey.questions[question]._id;
	      			qAndA.answerId = $scope.answers[i];
	      			submission.push(qAndA);
	      			qAndA = {};
	      			i++;
	      		}

	      		Survey.update($scope.survey._id, $scope.DNI, submission)
	      		.success(function(data){
	      			console.log(data);
	      			$scope.participation = false;
	      		})
	      		.error(function(data){
	      			console.log(data);
	      		})

	      		console.log(submission);
	      	};

	      	$scope.showPopup = function() {
	        ModalService.showModal({
	            templateUrl: '/templates/modal.html',
	            controller: function($scope, close, $element) {
	            			$scope.word = /^[XYZ]?\d{5,8}[A-Z]$/;

	            			
 							//  This close function doesn't need to use jQuery or bootstrap, because
							  //  the button has the 'data-dismiss' attribute.
							  $scope.close = function() {
							 	  close({
							      DNI: $scope.DNI      
							    }, 500); // close, but give 500ms for bootstrap to animate
							  };

							  //  This cancel function must use the bootstrap, 'modal' function because
							  //  the doesn't have the 'data-dismiss' attribute.
							  $scope.cancel = function() {

							    //  Manually hide the modal.
							    $element.modal('hide');
							    
							    //  Now call close, returning control to the caller.
							   /* close({
							      DNI: $scope.DNI      
							    }, 500); // close, but give 500ms for bootstrap to animate*/
							  };
				}
	        }).then(function(modal) {
		            modal.element.modal();
		            modal.close.then(function(result) {
		            	
	            		Survey.validateDNI($scope.survey._id, result.DNI)
	            		.success(function(data) {
           					 if(data){
           					 	console.log(data);
           					 	$scope.message = "You have already paricipated,sorry.";
           					 	$scope.participation = false;

           					 }else{
           					 	console.log(data);
           					 	$scope.message = "You can vote,ok.";
           					 	$scope.DNI = result.DNI;
           					 	$scope.participation = true;
           					 }
        				})
				        .error(function(data) {
				            console.log('Error: ' + data);
				        });
		            	
	            });
    	});
	};   
});
	    
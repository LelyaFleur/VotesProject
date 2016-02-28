angular.module('VotesProject').controller('SurveyController',function($scope, ModalService, Survey){
	      	
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
							    close({
							      DNI: $scope.DNI      
							    }, 500); // close, but give 500ms for bootstrap to animate
							  };
				}
	        }).then(function(modal) {
		            modal.element.modal();
		            modal.close.then(function(result) {

						var isDNI = function (dni) {
							var number, let, letter;
							var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;
						 
							dni = dni.toUpperCase();
						 
							if(expresion_regular_dni.test(dni) === true){
								number = dni.substr(0,dni.length-1);
								number = number.replace('X', 0);
								number = number.replace('Y', 1);
								number = number.replace('Z', 2);
								let = dni.substr(dni.length-1, 1);
								number = number % 23;
								letter = 'TRWAGMYFPDXBNJZSQVHLCKET';
								letter = letter.substring(number, number+1);
								if (letter != let) {
									console.log('Dni erroneo, la letra del NIF no se corresponde');
									return false;
								}else{
									console.log('Dni correcto');
									return true;
								}
							}else{
								console.log('Dni erroneo, formato no válido');
								return false;
							}
						};

		            	if(isDNI(result.DNI)){
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
		            	}else{
		            		$scope.message = "Your DNI is not valid, sorry";
		            		$scope.participation = false;
		            	}
		            	
		            });
	        	});
    		};   
	});
	    
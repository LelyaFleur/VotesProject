angular.module('VotesProject').controller('NewSurveyController',

  function(Survey, $scope){
        
        $scope.survey = { title: '',
                      questions: [{text: '',
                                      choices: [{text:'', votes: 0}]}
                       ]};  

              $scope.addQuestion = function(){
                $scope.survey.questions.push({text: '', choices: [{text:'',votes: 0}]});
              }; 

              $scope.removeQuestion = function(question){
                for(var i = $scope.survey.questions.length - 1; i >= 0; i--) {
                  if($scope.survey.questions[i] === question) {
                    $scope.survey.questions.splice(i, 1);
                  }
                }
              }; 

              $scope.addChoice = function(choices){                
                choices.push({text:'', votes: 0});
                $scope.$broadcast('newItemAdded');
              }; 

              $scope.removeChoice = function(answer, choices){
                for(var i = choices.length - 1; i >= 0; i--) {
                  if(choices[i] === answer) {
                    choices.splice(i, 1);
                  }
                }
              };

        $scope.addSurvey = function(surveys){
          surveys.push($scope.survey);

          Survey.create($scope.survey)
                  .success(function(data) {
                      $scope.formData = {}; // clear the form so our user is ready to enter another
                      $scope.surveys = data;
                      $scope.showForm = false;
                      console.log("Creating a survey:" + data);
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                });

          $scope.survey = { title: '',
                        questions: [{text: '',
                                           choices: [{text:'', votes: 0}]}
                        ]}; 
        };
});
    
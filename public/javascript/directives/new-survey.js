angular.module('VotesProject').directive('newSurvey', function(){
	return {
      restrict: 'E',
      templateUrl: 'templates/directives/new-survey.html',
      controller: function(Survey, $scope){
        
        this.survey = { title: '',
                      questions: [{text: '',
                                      choices: [{text:'', votes: 0}]}
                       ]};  

              this.addQuestion = function(){
                this.survey.questions.push({text: '', choices: [{text:'',votes: 0}]});
              }; 

              this.removeQuestion = function(question){
                for(var i = this.survey.questions.length - 1; i >= 0; i--) {
                  if(this.survey.questions[i] === question) {
                    this.survey.questions.splice(i, 1);
                  }
                }
              }; 

              this.addChoice = function(choices){                
                choices.push({text:'', votes: 0});
                $scope.$broadcast('newItemAdded');
              }; 

              this.removeChoice = function(answer, choices){
                for(var i = choices.length - 1; i >= 0; i--) {
                  if(choices[i] === answer) {
                    choices.splice(i, 1);
                  }
                }
              };

        this.addSurvey = function(surveys){
          surveys.push(this.survey);

          Survey.create(this.survey)
                  .success(function(data) {
                      $scope.formData = {}; // clear the form so our user is ready to enter another
                      $scope.surveys = data;
                      $scope.showForm = false;
                      console.log(data);
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                });

          this.survey = { title: '',
                        questions: [{text: '',
                                           choices: [{text:'', votes: 0}]}
                        ]}; 
        };
      },
      controllerAs: 'newSurveyCtrl'
    }
})

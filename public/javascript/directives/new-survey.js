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

              this.addChoice = function(choices){
                choices.push({text:'', votes: 0});
              } 

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

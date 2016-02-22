
var mongoose = require('mongoose');
//var voteSchema = new mongoose.Schema({ ip: 'String' });
var choiceSchema = new mongoose.Schema({ 
	text: String//,
	//votes: [voteSchema]
});

var questionSchema = new mongoose.Schema({
	text: { type: String, required: true },
 	choices: [choiceSchema]
});

var SurveySchema = new mongoose.Schema({
	title: String,
	questions: [questionSchema]

});

// return the model
module.exports = mongoose.model('Survey', SurveySchema);

var mongoose = require('mongoose');
//var voteSchema = new mongoose.Schema({ ip: 'String' });
var choiceSchema = new mongoose.Schema({ 
	_id:false,
	text: String//,
	//votes: [voteSchema]
});

var questionSchema = new mongoose.Schema({
	_id:false,
	text: { type: String, required: true },
 	choices: [choiceSchema]
});

var submissionSchema = new mongoose.Schema({
	_id:false,
	dni: String
});

var SurveySchema = new mongoose.Schema({
	title: String,
	questions: [questionSchema],
	submissions: [submissionSchema]

});

// return the model
module.exports = mongoose.model('Survey', SurveySchema);
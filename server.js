// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var Survey = require('./models/survey');
    
    // configuration =================

    mongoose.connect('mongodb://localhost:27017/test');   // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all surveys
    app.get('/api/surveys', function(req, res) {

        // use mongoose to get all surveys in the database
        Survey.find(function(err, surveys) {
            console.log(surveys);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(surveys); // return all surveys in JSON format
        });
    });

    // get survey by id
    app.get('/api/sur/:id', function(req, res) {
        var surveyId = req.params.id;
        Survey.findById(surveyId, function(err, survey) {
          if (err) 
            res.send(err)

            // show the one survey
            console.log(survey);
            res.json(survey);
        });

    });

    // create suvey 
    app.post('/api/surveys', function(req, res) {
        
        var survey = new Survey(req.body);      // create a new instance of the Survey model
          // 
        console.log(req.body);

        // save the survey and check for errors
        survey.save(function(err) {
            if (err)
                res.send(err);
            
            Survey.find(function(err, surveys) {
                if (err)
                    res.send(err)
                res.json(surveys);
            });
            //res.json({ message: 'Survey created!' });
        });

    });

    // delete a survey
    app.delete('/api/surveys/:id', function(req, res) {
        Survey.remove({
            _id : req.params.id
        }, function(err, survey) {
            if (err)
                res.send(err);
           // res.json({ message: 'Successfully deleted' });
            // get and return all the surveys after you delete another
            Survey.find(function(err, surveys) {
                if (err)
                    res.send(err)
                res.json(surveys);
            });
        });
    });

     // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
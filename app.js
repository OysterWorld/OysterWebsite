// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 8080; 				// set the port
var sendgrid    = require('./email');
//var mongoose = require('mongoose'); 					// mongoose for mongodb (v2.0)
//var database = require('./config/database'); 			// load the database config (v2.0)

var morgan = require('morgan'); 						// log requests to the console (express4)
var bodyParser = require('body-parser'); 				// pull information from HTML POST (express4)
var methodOverride = require('method-override'); 		// simulate DELETE and PUT (express4)

// configuration ===============================================================
//mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io (v2.0)

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// sendgrid
app.post('/contactUs', function (req, res) {
	var firstName = req.body.firstName,
		lastName = req.body.lastName,
		email = req.body.email,
		comment = req.body.comment,
		emailPayload = sendgrid.getEmailPayload(firstName, lastName, email, comment);

	function handleEmailResponse(err, json) {
        if(err) { 
            console.log(err);
        }

        console.log(json);
        var response = {
		    status  : 200,
		    success : 'Emailed Successfully'
		}

		res.end(JSON.stringify(response));
    }

	sendgrid.sendEmail(emailPayload, handleEmailResponse);
});

// listen (start app with node app.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

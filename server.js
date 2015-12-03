var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var User = require('./models/User');

var app = express();
app.use(bodyParser.json());

app.post('/api/users', function(req, res) {
	var user = new User(req.body);
	user.save().then(function() {
		return res.status(201).end();
	});
});

app.listen(8888);

mongoose.connect('mongodb://localhost/user-encrypt-password');
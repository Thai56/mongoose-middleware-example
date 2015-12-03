var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var schema = new mongoose.Schema({
	username: String,
	password: String
});

schema.pre('save', function(next) {
	
	var user = this;

	user.username = user.username.toLowerCase();

	if (user.isModified('password')) {
		//12 means secure
		bcrypt.genSalt(12, function(err, salt) {
			if (err) {
				next(err);
			}
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	}
	else {
		next();
	}
});

module.exports = mongoose.model('User', schema);
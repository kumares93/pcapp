var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/* UserSchema.pre('save', function (cb) {
    var currentUser = this;
    console.log('[HK] UserSchema.pre', currentUser.email, currentUser.password);
	if (!currentUser.isModified('password')) return cb();

	bcrypt.genSalt(5, function (err, salt){
		if (err) return cb(err);

		bcrypt.hash(currentUser.password, salt, null, function (err, hash) {
			if (err) return cb(err);
            currentUser.password = hash;
            console.log('[HK] hash>>', hash);
			return cb();
		});
	});
});*/

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

UserSchema.methods.authenticate = function (pass, success, faulure) {
    console.log("authenticate called: "+pass);
	bcrypt.compare(pass, this.password, function (err, res){
		console.log("Login: "+res);
		if (err) return faulure(err);
		success(res);
	});
};


module.exports = mongoose.model('User', UserSchema);

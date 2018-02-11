// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Rx = require('rxjs');
const Schema = mongoose.Schema;

const SALT_FACTOR = 12;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: Boolean
});
userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


userSchema.methods.comparePasswordObservable = function(candidatePassword) {
    const password = this.password;

    return Rx.Observable.create(function (observer) {
        bcrypt.compare(candidatePassword, password, (err, isMatch) => {
            if (err) observer.error(err);
            else observer.next(isMatch);

            observer.complete();
        });
    });
};
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', userSchema);
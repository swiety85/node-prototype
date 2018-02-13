const Rx = require('rxjs');

module.exports = (req, res) => {

    if (!req.body.name || !req.body.password) {
        return res.status(401).send('Invalid credentials');
    }

    return Rx.Observable.fromPromise(User.findOne({ username: req.body.name }).exec())
        .switchMap(function (user) {
            if (!user) {
                res.sendStatus(401);
                return Rx.Observable.empty();
            } else {
                return user.comparePasswordObservable(req.body.password)
                    .map(isPasswordValid => ({ user, isPasswordValid }));
            }
        })
        .map((data) => {
            if (data.isPasswordValid) {
                return auth.createToken(data.user);
            } else {
                res.sendStatus(401);
                return Rx.Observable.empty();
            }
        })
        .subscribe((token) => {
            res.json({ token });
        }, (err) => {
            res.send(err);
        });
};

// module.exports = (req, res) => {
//     if (req.body.name && req.body.password) {
//         // find the user
//         User.findOne({
//             username: req.body.name
//         }, (err, user) => {
//             if (err) return res.send(err);
//             if (!user) return res.sendStatus(401);
//
//             user.comparePassword(req.body.password, function(err, isMatch) {
//                 if (isMatch) {
//                     return res.json({
//                         token: auth.createToken(user)
//                     });
//                 } else {
//                     return res.sendStatus(401);
//                 }
//             });
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };
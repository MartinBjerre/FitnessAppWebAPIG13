const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
const User = mongoose.model('user');

module.exports.CreateWorkout = function (req,res) {
    Workout.create({
            name: req.body.WName,
            description: req.body.WDescription },
        (err, workout) => {
            if (err){
                res.render('error');
            } else {
                User.findByIdAndUpdate(
                    req.params.userId,
                    {$push: {workout: workout}},
                    {new: true},
                    (err, workout) => {
                        if (err) {
                            sendJsonResponse(res, 404, 'error');
                        }
                        else {
                            sendJsonResponse(res, 200, workout);
                        }
                    });
            }
        });
};

module.exports.ShowAll = function (req,res) {
    User.findById(req.params.userId)  //her er der en fejl ved ikke hvad.
        .populate('workout')
        .exec((err, User) => {
            if('error',err){
                sendJsonResponse(res, 200, 'error');
            }
            else {
                if (User != null) {
                    sendJsonResponse(res, 200, User.workout);
                } else {
                    sendJsonResponse(res, 404, 'error');
                }

            }
        });
};

// virker ikke endnu...
module.exports.remove= function(req, res){
    Workout.findByIdAndRemove(
        req.params.id,
        (err, workout) => {
            sendJsonResponse(res, 200, workout);
        });
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}
const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
const User = mongoose.model('user');

const _buildWorkout = function(req, res, results) {
    let workout = [];
    results.forEach((doc) => {
        workout.push({
            _id: doc._id,
            WorkoutName: doc.WorkoutName,
            WorkoutDescription: doc.WorkoutDescription,
            workout: doc.exercise
        });
    });
    return workout;
};

module.exports.CreateWorkout = function (req,res) {
    let workouts = [];
    Workout.create({
            WorkoutName: req.body.WorkoutName,
            WorkoutDescription: req.body.WorkoutDescription },
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
                            workouts = _buildWorkout(req, res, User.workout);
                            console.log(workouts);
                            sendJsonResponse(res, 200, workout);
                        }
                    });
            }
        });
};

module.exports.ShowAll = function (req,res) {
    let workout = [];
    User.findById(req.params.userId)
        .populate('workout')
        .exec((err, User) => {
            if('error',err){
                sendJsonResponse(res, 200, 'error');
            }
            else {
                if (User != null) {
                    workout = _buildWorkout(req, res, User.workout);
                    sendJsonResponse(res, 200, workout);
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
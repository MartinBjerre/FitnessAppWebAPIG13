const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
const Exercise = mongoose.model('exercise');


module.exports.CreateExercise = function(req, res) {
    Exercise.create(
        {
            exercise: req.body.Exercise,
            description: req.body.Description,
            sets: req.body.Sets,
            repstime: req.body.Repstime
        },
        (err, exer) => {
            Workout.findByIdAndUpdate(
                req.params.workoutId,
                {$push: {exercise: exer}},
                {new: true},
                (err, Workout) => {
                    if (err) {
                        //res.render('error');
                        sendJsonResponse(res,404,{"error" :"Exercise not found"});
                    }
                    else {
                        sendJsonResponse(res, 200, Workout);
                    }
                });
        });
};

module.exports.GetByWorkoutId = function(req, res) {
    Workout.findById(req.params.workoutId)
        .populate('exercise')
        .exec((err, Workout)=> {
            if (err){
                sendJsonResponse(res,404,{"error" :"Exercise not found"});
            } else {
                sendJsonResponse(res, 200, Workout.exercise);
            }
        });
};

//virker ikke skal lige snakke med poul ejner om dem
module.exports.remove = function (req, res) {
    Exercise.findByIdAndRemove(req,params.exeId)
        .exec(
            (err, exercise) => {
                if (err){
                    res.render('error');
                } else {
                    res.redirect('/workout/' + req.params.workoutId + '/exercise/');
                }
            });
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}
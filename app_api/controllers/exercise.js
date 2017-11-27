const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
const Exercise = mongoose.model('exercise');

const _buildExercise = function(req, res, results) {
    let exercise = [];
    results.forEach((doc) => {
        exercise.push({
            _id: doc._id,
            ExerciseName: doc.ExerciseName,
            ExerciseDescription: doc.ExerciseDescription,
            ExerciseSets: doc.ExerciseSets,
            ExerciseRepstime: doc.ExerciseRepstime
        });
    });
    return exercise;
};

module.exports.CreateExercise = function(req, res) {
    Exercise.create(
        {
            ExerciseName: req.body.ExerciseName,
            ExerciseDescription: req.body.ExerciseDescription,
            ExerciseSets: req.body.ExerciseSets,
            ExerciseRepstime: req.body.ExerciseRepstime
        },
        (err, exer) => {
            Workout.findByIdAndUpdate(
                req.params.workoutId,
                {$push: {exercise: exer}},
                {new: true},
                (err, Workout) => {
                    if (err) {
                        sendJsonResponse(res,404,{"error" :"Exercise not found"});
                    }
                    else {
                        sendJsonResponse(res, 200, Workout.exercise);
                    }
                });
        });
};

module.exports.GetByWorkoutId = function(req, res) {
    let Exercises = [];
    Workout.findById(req.params.workoutId)
        .populate('exercise')
        .exec((err, Workout)=> {
            if (err){
                sendJsonResponse(res,404,{"error" :"Exercise not found"});
            } else {
                if(Workout != null) {
                    Exercises = _buildExercise(req, res, Workout.exercise);
                    sendJsonResponse(res, 200, Exercises);
                }
                else {
                    sendJsonResponse(res,404,{"error" :"Exercise not found"});
                }
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
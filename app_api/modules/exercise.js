const mongoose = require('mongoose');

const ExerciseSH = new mongoose.Schema({
    ExerciseName: String,
    ExerciseDescription: String,
    ExerciseSets: Number,
    ExerciseRepstime: Number
});

const exercise = mongoose.model('exercise', ExerciseSH);
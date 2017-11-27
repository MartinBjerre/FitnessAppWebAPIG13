const express = require('express');
const router = express.Router();
const workout = require('../controllers/workout');
const exercise = require('../controllers/exercise');
const user = require('../controllers/user');


router.get('/user', user.ShowAllUser );
router.post('/user/CreateUser', user.CreateUser);
router.get('/user/:userId/workout', workout.ShowAll);
router.post('/user/:userId/workout/CreateWorkout', workout.CreateWorkout);
router.get('/user/:userId/workout/:workoutId/exercise',exercise.GetByWorkoutId);
router.post('/user/:userId/workout/:workoutId/exercise/CreateExercise',exercise.CreateExercise);
//router.post('/workout/:workoutId/exercise/:exeId/remove', exercise.remove);

module.exports = router;

const mongoose = require('mongoose');
const User = mongoose.model('user');

/**/
const _buildUser = function(req, res, results) {
    let user = [];
    results.forEach((doc) => {
        user.push({
            _id: doc._id,
            UserName: doc.name,
            workout: doc.workout
        });
    });
    return user;
};
/*/*/
module.exports.CreateUser = function (req,res) {
    let users = [];
    User.create({
            name: req.body.UserName},
        (err, user) => {
            if (err){
                res.render('error');
            } else {
                User.find({},
                    (err, user) => {
                        if (err) {
                            sendJsonResponse(res, 404 ,{"error": "user not found"});
                        }
                        else {
                            users = _buildUser(req, res, user);
                            console.log(users);
                            sendJsonResponse(res, 200 , users);
                        }
                    });
            }
        });
};

module.exports.ShowAllUser = function (req,res) {
    let users = [];
    User.find({})
        .exec((err, user) => {
            if(err){
                sendJsonResponse(res, 404 ,{"error": "user not found"});
            }
            else {
                users = _buildUser(req, res, user);
                console.log(users);
                sendJsonResponse(res, 200 ,users);
            }
        });
};

const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
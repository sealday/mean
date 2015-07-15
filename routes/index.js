var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;


// Connection URL
var url = 'mongodb://localhost:27017/test';


router.post('/user/register', function (req, res, next) {
    //Register
    var registerUser = function (db, callback) {
        var users = db.collection('user');
        users.findOne({username: req.body.username}, function (err, result) {
            if (result != null) {
                console.dir(result);
                console.log("register failure");
                res.status(409).end();
            }
            else {
                users.insertOne({username: req.body.username, password: req.body.password}, function (err, result) {
                    if (!err) {
                        console.log("register success");
                        callback(result);
                    }
                    else {
                        console.log("register failure");
                        res.status(409).end();
                    }

                })
            }

        })
    }

    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        registerUser(db, function () {
                res.status(200);
                res.json({msg: 'success'});
                db.close();
            }
        )
    })
});


router.post('/user/signin', function (req, res, next) {
    //Sign
    var signUser = function (db, callback) {
        var user = db.collection('user');
        user.findOne({username: req.body.username}, function (err, result) {
            if (result.password == req.body.password) {
                console.log('sign in success');
                callback(result);
            }
            else {
                console.log('sign in failure');
                res.status(401).end();
            }

        })
    };

    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        signUser(db, function () {
            res.status(200);
            res.json({msg: 'success'});
            db.close();
        })

    })
});

//---------------------------------------------------------------

router.get('/users', function (req, res, next) {
    //findAllwords
    var findAllwords = function (db, callback) {
        var collection = db.collection('words');
        collection.find({}).toArray(function (err, result) {
            if (!err) {
                console.dir(result);
                console.log("find success");
                callback(result);
            }
            else {
                console.log("find failure");
                res.status(409).end();
            }

        });
    }
// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        findAllwords(db, function (result) {
            res.status(200);
            res.json(result);
            db.close();
        })
    });
});


router.post('/users', function (req, res, next) {
//insert
    var insertWords = function (db, callback) {
        var collection = db.collection('words');
        collection.insertOne({word: req.body.item}, function (err, result) {
            if (!err) {
                console.log("insert success");
                callback(result);
            }
            else {
                console.log("insert failure");
                res.status(409).end();
            }

        });

    }
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        insertWords(db, function () {
            res.status(200);
            res.json({msg: 'success'});
            db.close();
        })
    });
    //  items.push(req.body.item);
});


module.exports = router;

var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
var crypto = require('crypto');

// Connection URL
var url = 'mongodb://localhost:27017/test';
var ObjectID = mongodb.ObjectId;


//===================================================================================================
/*
 * init mongodb*/
MongoClient.connect(url, function (err, db) {
    var users = db.collection('user');
    users.indexExists('usernameIndex', function (err, result) {
        if (!result) {
            users.createIndex({username: 1}, {unique: true, name: "usernameIndex"}, function (err) {
                //if (err) throw err;
                if (err) {
                    console.log(err);
                }
            });
        }
    });
});

/*register & sign in/out
 */
router.post('/register', function (req, res, next) {
    //Register
    var registerUser = function (db, callback) {
        var users = db.collection('user');
        users.insertOne({username: req.body.username, password: req.body.password}, function (err, result) {
            if (!err) {
                console.log("register success");
                callback(result);
            }
            else {
                console.log("register failure");
                res.status(409).end();
                db.close();
            }

        });
    };

    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        registerUser(db, function () {
                res.status(201);
                res.json({msg: 'success'});
                db.close();
            }
        )
    });
});

router.post('/signin', function (req, res, next) {
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
                db.close();

            }

        });
    };

    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        signUser(db, function () {
            res.status(200);
            res.json({msg: 'success'});
            db.close();
        });
    });
});

//=====================================================================================================
/*funtest*/
router.get('/words', function (req, res, next) {
    //findAllWords
    var findAllWords = function (db, callback) {
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
                db.close();
            }

        });
    };
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        findAllWords(db, function (result) {
            res.status(200);
            res.json(result);
            db.close();
        });
    });
});


router.post('/words', function (req, res, next) {
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
                db.close();
            }
        });
    };
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        insertWords(db, function () {
            res.status(200);
            res.json({msg: 'success'});
            db.close();
        });
    });
});
//====================================================================================================
/*user CURB*/
router.get('/api/users', function (req, res, next) {
    var getAllUser = function (db, callback) {
        var users = db.collection('user');
        console.dir(req.query);
        users.find({
            $and: [{name: new RegExp(req.query.name)},
                {username: new RegExp(req.query.username)},
                {password: new RegExp(req.query.password)},
                {role: new RegExp(req.query.role)}]
        }).toArray(function (err, result) {
                if (!err) {
                    //console.dir(result);
                    console.log("find success");
                    callback(result);
                }
                else {
                    console.log("find failure");
                    res.status(409).end();
                    db.close();
                }
            }
        );
    };
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        getAllUser(db, function (result) {
            res.status(200);
            res.json(result);
            db.close();
        });
    });
});

// find one user by _id
router.get('/api/users/:id', function (req, res, next) {
    var getOneUser = function (db, callback) {
        var users = db.collection('user');
        users.findOne({_id: ObjectID(req.params.id)}, function (err, result) {
                if (!err) {
                    console.dir(result);
                    console.log("find one success");
                    callback(result);
                }
                else {
                    console.log("find one failure");
                    res.status(409).end();
                    db.close();
                }
            }
        );
    };
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        getOneUser(db, function (result) {
            res.status(200);
            res.json(result);
            db.close();
        });
    });
});

//add one user
router.post('/api/users', function (req, res, next) {
    var insertOneUser = function (db, callback) {
        var users = db.collection('user');
        users.insertOne({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        }, function (err, result) {
            if (!err) {
                console.log("insert success");
                callback(result);
            }
            else {
                console.log("insert failure");
                res.status(409).end();
                db.close();
            }

        });
    };
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        insertOneUser(db, function () {
            res.status(200);
            res.json({msg: 'success'});
            db.close();
        });
    });
})

//update one user
router.post('/api/users/:id', function (req, res, next) {
    var updateOneUser = function (db, callback) {
        var users = db.collection('user');
        users.updateOne({
                _id: ObjectID(req.params.id)
            }
            , {
                $set: {
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    role: req.body.role
                }
            }
            , function
                (err, result) {
                if (!err) {
                    console.log("update success");
                    callback(result);
                }
                else {
                    console.log("update failure");
                    res.status(409).end();
                    db.close();
                }
            }
        );
    };
// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        updateOneUser(db, function () {
            res.status(200);
            res.json({msg: 'success'});
            db.close();
        });
    });
});

router.delete('/api/users/:id', function (req, res, next) {
    var deleteOneUser = function (db, callback) {
        var users = db.collection('user');
        users.deleteOne({_id: ObjectID(req.params.id)}, function (err, result) {
            if (!err) {
                console.log("delete success");
                callback(result);
            }
            else {
                console.log("delete failure" + err);
                res.status(409).end();
                db.close();
            }
        });
    };
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        deleteOneUser(db, function () {
            res.status(200);
            res.json({msg: 'success'});
            db.close();
        });
    });
});
//===================================================================================================
/*subject*/

module.exports = router;

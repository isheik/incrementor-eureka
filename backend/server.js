// load packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// connect DB
// TODO: change connect method to modern one
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/backend');
// var promise = mongoose.connect('mongodb://localhost/backend', {
//     useMongoClient: true
// });

var User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 1337;

var router = express.Router();

router.use((req, res, next) => {
    console.log('test');
    next();
});

router.get('/', (req, res) => {
    res.json({ message: 'posted test message'});
});

app.use('/api', router);

app.listen(port);
console.log('listening port: ' + port);

// TODO: Review error handling and return data.
// TODO: Password should be crypted.
// TODO: Check whether email already exists
// TODO: input validation should be performed in backend too?
/**
 * @return token(id)
 */
router.route('/user/register')
    .post((req, res) => {
        var user = new User();

        user.mail = req.body.mail;
        user.password = req.body.password;
        user.identifier = 0;

        user.save((err, user) => {
            if(err)
                res.send(err);
            res.json(user._id);
        });
    });

// TODO: DEL this API gets all users.
router.route('/user/all')
    .get((req, res) => {
        User.find((err, users) => {
            if(err)
                res.send(err);
            console.log(req.params);
            res.json(users);
        });
    });

// TODO: handle email upper and lower cases
// TODO: input validation should be performed in backend too?
/**
 * Returns for each case
 * err: return err page
 * no user found OR
 * password unmatch: return message
 * else: return user token(id)
 */
router.route('/user/login')
    .post((req, res) => {
        User.findOne({ 'mail' : req.body.mail }, (err, user) => {
            /* 
               err: return err page
               no user found OR
               password unmatch: return message
               else: return user token(id)
            */
            if (err)
                res.send(err);
            else if (user == null || req.body.password != user.password)
                res.send({ message: 'Wrong user id or password.' });
            else
                res.json(user._id);
        });
    });

// TODO: fix CastError for ObjectID.
// When token is defined but not proper format of _id, then cause castError
// But not terminate Node.js
router.route('/data/nextidentifier')
    .post((req, res) => {
        User.findOne({'_id' : req.body.token }, (err, user) => {
            if (err)
                res.send(err);
            else if (user == null)
                res.send({ message: 'Please login first.' });
            else {
                user.identifier = user.identifier + 1;
                user.save(err => {
                    if(err)
                        res.send(err);
                    res.json(user.identifier);
                });
            }
        });
    });

// TODO: fix CastError for ObjectID.
// When token is defined but not proper format of _id, then cause castError
// But not terminate Node.js
router.route('/data/resetidentifier')
    .post((req, res) => {
        User.findOne({'_id' : req.body.token }, (err, user) => {
            if (err)
                res.send(err);
            else if (user == null)
                res.send({ message: 'Please login first.' });
            else if (req.body.resetval == undefined) 
                res.send({ message: 'Reset value is not set.'});
            else if (req.body.resetval <= 0)
                res.send({ message: 'Reset value has to be positive number.'});
            else {
                user.identifier = req.body.resetval;
                user.save(err => {
                    if(err)
                        res.send(err);
                    res.json(user.identifier);
                });
            }
        });
    });

router.route('/users/:user_id')
    // get a user by mongo id
    .get((req, res) => {
        console.log(req.params.user_id);
        User.findById(req.params.user_id, (err, user) =>{
            if(err)
                res.send(err);
            res.json(user);
        });
    })
    // update an user's identifier
    .put((req, res) => {
        User.findById(req.params.user_id, (err, user) =>{
            if(err)
                res.send(err);
            user.identifier = user.identifier + 1;
            
            user.save(err => {
                if(err)
                    res.send(err);
                res.json({ message: 'Incremented identifier'});
            });
        });
    })
    // delete an user's identifier
    .delete((req, res) => {
        User.remove({
            _id: req.params.user_id
        }, (err, user) => {
            if(err)
                res.send(err);
            res.json({ message: 'deleted user'});
        });
    });


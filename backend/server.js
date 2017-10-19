// load packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// connect DB
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

router.route('/users')
    .post((req, res) => {
        var user = new User();

        user.mail = req.body.mail;
        user.password = req.body.password;
        user.identifier = 1;

        user.save(err => {
            if(err)
                res.send(err);
            res.json({ message: 'User created.' });
        });
    })
    .get((req, res) => {
        User.find((err, users) => {
            if(err)
                res.send(err);
            res.json(users);
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
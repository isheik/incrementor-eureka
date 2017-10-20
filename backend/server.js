// load packages
var express = require('express');
var settings = require('./setting');
var app = express();
var bodyParser = require('body-parser');
var validator = require('validator');
var lowerCase = require('lower-case');

// connect DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + settings.host + '/' + settings.db, {
    useMongoClient: true, promiseLibrary:global.Promise
});

// load data schema
var User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO: Remove this if deploy to somewhere
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://' + settings.host + ':' + settings.acao_port);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// set the port number for WEB APIs
var port = process.env.PORT || settings.port;

var router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    res.json({ message: 'posted test message'});
});

app.use('/api', router);

// start listening the port
app.listen(port);
console.log('listening port: ' + port);

// TODO: Password should be crypted.
/**
 * router for user registration. Does not allow to register
 * the same email address and email is evaluated as case insensitive
 * 
 * Response status
 *  - 200 success
 *  - 400 user already exists
 *  - 404 email address form is invalid
 * 
 * @param req request
 *            expect the following POST params
 *              - mail the email address to register
 *              - password the user password to register
 *        res response
 * @return token  the API key (user id) used for call other APIs
 */
router.route('/user/register')
    .post((req, res) => {
        let lowerMail = lowerCase(req.body.mail);
        User.findOne({ 'mail' : lowerMail }, (err, user) => {
            if (err)
                res.send(err);

            if(user == null) {
                if (validator.isEmail(lowerMail)){
                    let user = new User();

                    user.mail = lowerMail;
                    user.password = req.body.password;
                    user.identifier = 0;

                    user.save((err, user) => {
                        if(err)
                            res.send(err);

                        // res.setHeader('Content-Type', 'application/vnd.api+json');
                        res.status(200).json(user._id);
                    });
                } else {
                    res.status(404).send();
                }
            } else {
                res.status(400).send();
            }
        });
   });

/**
 * router for user login. 
 * 
 * Response status
 *  - 200 success
 *  - 404 user does not exists or password is wrong
 * 
 * @param req request
 *            expect the following POST params
 *              - mail the email address to authenticate
 *              - password the user password to authenticate
 *        res response
 * @return token  the API key (user id) used for call other APIs
 */
router.route('/user/login')
    .post((req, res) => {
        let lowerMail = lowerCase(req.body.mail);
        User.findOne({ 'mail' : lowerMail }, (err, user) => {
            if (err)
                res.send(err);
            else if (user == null || req.body.password != user.password)
                res.status(404).send();
            else
                // res.setHeader('Content-Type', 'application/vnd.api+json');
                res.status(200).json(user._id);
        });
    });

/**
 * router for getting current identifier.
 * 
 * Response status
 *  - 200 success
 *  - 404 user is not authenticated 
 * 
 * @param req request
 *            expect the following POST params
 *              - token the token obtained by login
 *        res response
 * @return identifier  the current identifier.
 */
router.route('/data/currentidentifier')
    .post((req, res) => {
        if (req.body.token) {
            User.findOne({'_id' : req.body.token }, (err, user) => {
                if (err)
                    res.send(err);
                else if (user == null)
                    res.status(404).send();
                else 
                    // res.setHeader('Content-Type', 'application/vnd.api+json');
                    res.status(200).json(user.identifier);
            });
        } else {
            res.status(404).send();
        }
    });

/**
 * router for getting next identifier.
 * 
 * Response status
 *  - 200 success
 *  - 404 user is not authenticated 
 * 
 * @param req request
 *            expect the following POST params
 *              - token the token obtained by login
 *        res response
 * @return identifier  the next identifier.
 */
router.route('/data/nextidentifier')
    .post((req, res) => {
        if (req.body.token) {
            User.findOne({'_id' : req.body.token }, (err, user) => {
                if (err)
                    res.send(err);
                else if (user == null)
                    res.status(404).send();
                else {
                    user.identifier = user.identifier + 1;
                    user.save(err => {
                        if(err)
                            res.send(err);

                        // res.setHeader('Content-Type', 'application/vnd.api+json');
                        res.status(200).json(user.identifier);
                    });
                }
            });
        } else {
            res.status(404).send();
        }
    });


/**
 * router for reset identifier.
 * 
 * Response status
 *  - 200 success
 *  - 404 user is not authenticated 
 * 
 * @param req request
 *            expect the following POST params
 *              - token the token obtained by login
 *              - resetval the integer value to set
 *        res response
 */
router.route('/data/resetidentifier')
    .post((req, res) => {
        if (req.body.token) {
            User.findOne({'_id' : req.body.token }, (err, user) => {
                if (err)
                    res.send(err);
                else if (user == null)
                    res.status(404).send();
                else if (!validator.isInt(req.body.resetval) || req.body.resetval <= 0)
                    res.status(400).send();
                else {
                    user.identifier = req.body.resetval;
                    user.save(err => {
                        if(err)
                            res.send(err);
                        // res.setHeader('Content-Type', 'application/vnd.api+json');
                        res.status(200).json(user.identifier);
                    });
                }
            });
        } else {
            res.status(404).send();
        }
   });

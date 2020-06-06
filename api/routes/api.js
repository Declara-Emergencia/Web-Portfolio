const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../db/models/user.model');
const db = "mongodb://testuser:testpw@ds123136.mlab.com:23136/eventsdb";
// mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
});

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }

    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }

    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }

    req.userId = payload.subject

    next()
}

/**
 * GET /users
 * Purpose: Get all users
 */
router.get('/users', (req, res) => {
    // Return an array of all the users in the database
    User.find({}).then((users) => {
        res.send(users);
    });
});

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error){
            console.log(error);
        }
        else{
            if(!user){
                res.status(401).send('invalid email')
            }
            else{
                if(user.password != userData.password){
                    res.status(401).send('invalid password')
                }
                else{
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.post('/register', (req, res) => {
    let userData = req.body
    let uuser = new User(userData)

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        }
        else {
            if (user) {
                res.status(401).send('invalid email')
            }
            else {
                uuser.save((err, registeredUser) => {
                    if (err) {
                        console.log(err)
                    } else {
                        let payload = { subject: registeredUser._id }
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({ token })
                    }
                })
            }
        }
    })
})  

router.delete("/user/:id", function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, deletedUser) {
        if(err){
            res.send("error deleting user");
        }
        else{
            res.json(deletedUser);
        }
    });
});

module.exports = router;
